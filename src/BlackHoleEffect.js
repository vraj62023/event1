import React, { useEffect, useRef } from "react";

const BlackHoleEffect = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl");

        const bgUrl = "https://images.unsplash.com/photo-1580428182044-5fd08a24df38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";


        const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
          gl_Position = vec4(a_position, 0, 1);
          v_texCoord = a_texCoord;
      }
    `;

        const fragmentShaderSource = `
      precision mediump float;
      uniform float u_mass;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_clickedTime;
      uniform sampler2D u_texture;
      varying vec2 v_texCoord;
      void main() {
          vec2 uv = v_texCoord;
          vec2 diff = uv - u_mouse;
          float r = length(diff);
          float strength = u_mass / (r * r + 0.0001);
          float angle = strength * 0.0005;
          float s = sin(angle);
          float c = cos(angle);
          diff = mat2(c, -s, s, c) * diff;
          vec2 distortedUV = u_mouse + diff;
          gl_FragColor = texture2D(u_texture, distortedUV);
      }
    `;

        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const createProgram = (gl, vs, fs) => {
            const program = gl.createProgram();
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            return program;
        };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
        const mouseLocation = gl.getUniformLocation(program, "u_mouse");
        const massLocation = gl.getUniformLocation(program, "u_mass");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const clickedTimeLocation = gl.getUniformLocation(program, "u_clickedTime");

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        const texCoords = [
            0, 0, 1, 0, 0, 1,
            0, 1, 1, 0, 1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

        let mouse = { x: 0.5, y: 0.5 };
        let targetMouse = { x: 0.5, y: 0.5 };
        let clicked = false;
        let clickedTime = 0;
        let blackholeMass = 500;
        let curMass = 0;
        let startTime = Date.now();

        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            targetMouse.x = (e.clientX - rect.left) / canvas.width;
            targetMouse.y = 1 - (e.clientY - rect.top) / canvas.height;
        });

        canvas.addEventListener("mousedown", () => {
            clicked = true;
        });

        canvas.addEventListener("mouseup", () => {
            clicked = false;
        });

        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = bgUrl;
        image.onload = () => {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            const draw = () => {
                const currentTime = (Date.now() - startTime) / 1000;
                curMass += ((clicked ? blackholeMass : 0) - curMass) * 0.1;
                mouse.x += (targetMouse.x - mouse.x) * 0.1;
                mouse.y += (targetMouse.y - mouse.y) * 0.1;
                clickedTime = clicked ? clickedTime + 0.1 : clickedTime * 0.9;

                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

                // Bind positions
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.enableVertexAttribArray(positionLocation);
                gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

                // Bind texcoords
                gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
                gl.enableVertexAttribArray(texCoordLocation);
                gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

                gl.uniform2f(mouseLocation, mouse.x, mouse.y);
                gl.uniform1f(massLocation, curMass);
                gl.uniform1f(timeLocation, currentTime);
                gl.uniform1f(clickedTimeLocation, clickedTime);

                gl.drawArrays(gl.TRIANGLES, 0, 6);
                requestAnimationFrame(draw);
            };

            draw();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            style={{ width: "100vw", height: "100vh", display: "block" }}
        />
    );
};

export default BlackHoleEffect;
