function createVertexBuffer(GL, data){
    var VERTEX = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(data.vertices), GL.STATIC_DRAW);
    return VERTEX;
  }
  
  function createFacesBuffer(GL, data){
    var FACES = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.faces), GL.STATIC_DRAW);
    return FACES;
  }
  
  function createColorBuffer(GL, data){
    var COLORS = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, COLORS);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(data.colors), GL.STATIC_DRAW);
    return COLORS;
  }
  
  function main() {
    var CANVAS = document.getElementById("myCanvas");
  
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
  
    var drag = false;
    var x_prev = 0;
    var y_prev = 0;
  
    var dx = 0;
    var dy = 0;
  
    var alpha = 0;
    var theta = 0;
    var friction = 0.3;
  
    var mouseDown = function (e) {
      drag = true;
      x_prev = e.pageX;
      y_prev = e.pageY;
      console.log("DOWN");
    };
  
    var mouseUP = function (e) {
      drag = false;
      console.log("UP");
    };
  
    var mouseOut = function (e) {
      console.log("OUT");
    };
  
    var mouseMove = function (e) {
      if (!drag) {
        return false;
      }
  
      dx = e.pageX - x_prev;
      dy = e.pageY - y_prev;
  
      console.log(dx + " " + dy);
      x_prev = e.pageX;
      y_prev = e.pageY;
  
      theta += (dx * 2 * Math.PI) / CANVAS.width;
      alpha += (dy * 2 * Math.PI) / CANVAS.height;
    };
    
  
    CANVAS.addEventListener("mousedown", mouseDown, false);
    CANVAS.addEventListener("mouseup", mouseUP, false);
    CANVAS.addEventListener("mouseout", mouseOut, false);
    CANVAS.addEventListener("mousemove", mouseMove, false);
  
    var GL;
    try {
      GL = CANVAS.getContext("webgl", { antialias: true });
      var EXT = GL.getExtension("OES_element_index_uint");
    } catch (e) {
      alert("WebGL context cannot be initialized");
      return false;
    }
  
    var shader_vertex_source = `
            attribute vec3 position;
            attribute vec3 color;
        
            uniform mat4 PMatrix;
            uniform mat4 VMatrix;
            uniform mat4 MMatrix;
           
            varying vec3 vColor;
            void main(void) {
            gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.);
            vColor = color;
            }`;
  
    var shader_fragment_source = `
            precision mediump float;
            varying vec3 vColor;
            // uniform vec3 color;
            void main(void) {
            gl_FragColor = vec4(vColor, 1.);
           
            }`;
  
    var compile_shader = function (source, type, typeString) {
      var shader = GL.createShader(type);
      GL.shaderSource(shader, source);
      GL.compileShader(shader);
      if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
        alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
        return false;
      }
      return shader;
    };
  
    var shader_vertex = compile_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
    var shader_fragment = compile_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");
  
    var SHADER_PROGRAM = GL.createProgram();
    GL.attachShader(SHADER_PROGRAM, shader_vertex);
    GL.attachShader(SHADER_PROGRAM, shader_fragment);
    GL.linkProgram(SHADER_PROGRAM);
  
    var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
    var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
  
    var _PMatrix = GL.getUniformLocation(SHADER_PROGRAM, "PMatrix"); //Projection
    var _VMatrix = GL.getUniformLocation(SHADER_PROGRAM, "VMatrix"); //View
    var _MMatrix = GL.getUniformLocation(SHADER_PROGRAM, "MMatrix"); //Model
  
    GL.enableVertexAttribArray(_color);
    GL.enableVertexAttribArray(_position);
    GL.useProgram(SHADER_PROGRAM);
  
    //-----COLOR THEO-----//
    var bodyColor = [217/255, 161/255, 9/255]
    var eyeColor = [25/255, 25/255, 25/255]
    var eyeReflectColor = [255/255, 255/255, 255/255]
    var antennaColor = [140/255, 140/255, 140/255]
    var lipsColor = [25/255, 25/255, 25/255]
    var insideMouthColor = [200/255, 0/255, 0/255]
    var teethColor = [255/255, 255/255, 255/255]
    var signalColor = [180/255, 0/255, 0/255]
    var rockColor1 = [71/255, 38/255, 0/255]
    var rockColor2 = [51/255, 27/255, 1/255]
    var grassColor = [21/255, 117/255, 1/255]
    var dirtColor = [80/255, 50/255, 1/255]
    var bushColor1 = [50/255, 190/255, 0/255]
    var bushColor2 = [60/255, 210/255, 0/255]
    var houseColor = [240/255, 224/255, 203/255]
    var roofColor = [94/255, 0/255, 0/255]
    var pillarColor = [38/255, 20/255, 0/255]
    var doorColor = [130/255, 95/255, 35/255]
    var doorColor2 = [160/255, 120/255, 45/255]
    var windowColor = [175/255, 255/255, 255/255]
    var redColor = [212/255, 0/255, 0/255]
    var wheelColor = [31/255, 31/255, 31/255]
    var machineColor = [54/255, 54/255, 54/255]

    // //-----COLOR GELWIN-----//
    // var cornColor = [255/255, 255/255, 0/255]
    // var mataColor = [235/255, 236/255, 240/255, 42/255, 42/255, 39/255]
    // var leafGreenColor = [166/255, 214/255, 9/255]
    // var headbandColor = [164/255, 42/255, 4/255]
    // var leafGreenColor2 = [79/255, 121/255, 66/255]
    // var leafGreenColor3 = [34/255, 139/255, 34/255]
    // var leafGreenColor4 = [128/255, 128/255, 0/255]

    // var hidung = generateEllipticParaboloid(1.55, -6.85, -4.5, 0.5, 0.5, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 100);
    // //tangkai horizontal
    // var tangkai1 = generateHyperboloid(-1.65, 1, -6, 0.3, 0.3, 3.65, leafGreenColor2[0], leafGreenColor2[1], leafGreenColor2[2], 100);
    // //tangkai vertikal
	// var tangkai2 = generateTube(-1.65, 0.5, -12, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 1.25, 0.5, 0.5, 100);
    // var headband = generateTorus(-1.65, -2, 0.25, headbandColor[0], headbandColor[1], headbandColor[2], 2.8, .3, 100, 100, 5, 0, 0);
    // var headband2 = generateSphere(-1.65, -1.5, -2.25, headbandColor[0], headbandColor[1], headbandColor[2], 0.75, 100);
    // var headband3 = generateTube(-1.65, -3, -3.25, headbandColor[0], headbandColor[1], headbandColor[2], 1, 0.5, 0.5, 100);
    // var plate = generateTube(-1.65, 1.7, -12, leafGreenColor4[0], leafGreenColor4[1], leafGreenColor4[2], 2.5, 2.5, 3.5, 100);
    // var ammunition = generateSphere(-1.65, 4.75, -12, cornColor[0], cornColor[1], cornColor[2], 1.75, 100);

    // var pucuk = generateTube(-1.65, -0.5, 0, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 1.95, 0.5, 0.5, 100);
    // var badanAtas = generateTube(-1.65, -2.5, 0, cornColor[0], cornColor[1], cornColor[2], 2, 2.8, 1.75, 100);
    // var badanTengah = generateTube(-1.65, -6, 0, cornColor[0], cornColor[1], cornColor[2], 3.5, 3.65, 2.8, 100);
    // var badanBawah = generateTube(-1.65, -10, 0, cornColor[0], cornColor[1], cornColor[2], 4, 4, 3.65, 100);
    // var alas = generateEllipsoid(-1.55, -10, 0, 7, 0.2, 7, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 100);
    // //mata kiri 
    // var mata1 = generateEllipsoid(-2.3, -6, 3.4 , .5, .6, .45, eyeColor[3], eyeColor[4], eyeColor[5], 100);
    // var mata2 = generateEllipsoid(-2.3, -6, 3.85 , .2, .3, .2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    // //mata kanan
    // var mata3 = generateEllipsoid(-0.8, -6, 3.4 , .5, .6, .45, eyeColor[3], eyeColor[4], eyeColor[5], 100);
    // var mata4 = generateEllipsoid(-0.8, -6, 3.85 , .2, .3, .2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    // var alisKiri = generateEllipsoid(-3, -5, 3.2, .7, .2, .2, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 100);
    // var alisKanan = generateEllipsoid(0, -5, 3.2, .7, .2, .2, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 100);


  
    // BASE
    var base = generateTube(0, -3, 0.55, grassColor[0], grassColor[1], grassColor[2], 2, 40, 40, 100);
    var base2 = generateTube(0, -28, 0.55, dirtColor[0], dirtColor[1], dirtColor[2], 25, 40, 40, 100);
    // var base3 = generateEllipsoid(0, -1, 0, 100, 0, 100, grassColor[0], grassColor[1], grassColor[2], 100);
    var bush1 = generateEllipsoid(7.5 , 1, -15 , 3, 5, 3, bushColor1[0], bushColor1[1], bushColor1[2], 100);
    var bush2 = generateEllipsoid(11, 1, -17, 2.75, 3.5, 2.75, bushColor2[0], bushColor2[1], bushColor2[2], 100);
    var house = generateCube(-10, 0, -17, houseColor[0], houseColor[1], houseColor[2], 14, 0, 0, 0);
    var house2 = generateCube(-10, 8, -17, houseColor[0], houseColor[1], houseColor[2], 14, 0, 0, 0);
    var roof = generateTube(-10, 15, -17, roofColor[0], roofColor[1], roofColor[2], 7, 12, 2, 100);
    var pillar1 = generateTube(-2.5, -1, -9.1, pillarColor[0], pillarColor[1], pillarColor[2], 16, 1, 1, 100);
    var pillar2 = generateTube(-17.5, -1, -9.1, pillarColor[0], pillarColor[1], pillarColor[2], 16, 1, 1, 100);
    var pillar3 = generateTube(-17.5, -1, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 16, 1, 1, 100);
    var pillar4 = generateTube(-2.5, -1, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 16, 1, 1, 100);
    var door = generateEllipsoid(-10 , 1, -10, 3, 6, 0.1, pillarColor[0], pillarColor[1], pillarColor[2], 100);
    var door2 = generateEllipsoid(-10 , 1, -10, 2.3, 5.3, 0.2, doorColor2[0], doorColor2[1], doorColor2[2], 100);
    var fence1 = generateTube(5, -1, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 7, 1, 1, 100);
    var fenceConnect1 = generateTubeM(-3, 4, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 7, 0.5, 0.5, 100);
    var fenceConnect2 = generateTubeM(-3, 2, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 7, 0.5, 0.5, 100);
    var fence2 = generateTube(13, -1, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 7, 1, 1, 100);
    var fenceConnect3 = generateTubeM(6, 4, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 7, 0.5, 0.5, 100);
    var fenceConnect4 = generateTubeM(6, 2, -24.5, pillarColor[0], pillarColor[1], pillarColor[2], 7, 0.5, 0.5, 100);
    var window1 = generateEllipsoid(-3 , 8, -16.75, 0.1, 4, 4, pillarColor[0], pillarColor[1], pillarColor[2], 100);
    var window2 = generateEllipsoid(-2.9 , 8, -16.75, 0.1, 3, 3, windowColor[0], windowColor[1], windowColor[2], 100);
    var tree = generateTube(7.5, -1, -18, pillarColor[0], pillarColor[1], pillarColor[2], 25, 2, 2, 100);
    var redBody = generateEllipsoid(12 , 1, -7, 3, 2, 6, redColor[0], redColor[1], redColor[2], 100);
    var wheel1 = generateTubeM(8.35, 0, -4, wheelColor[0], wheelColor[1], wheelColor[2], 1, 1, 1, 100);
    var wheel2 = generateTubeM(14.6, 0, -4, wheelColor[0], wheelColor[1], wheelColor[2], 1, 1, 1, 100);
    var wheel3 = generateTubeM(8.35, 0, -10, wheelColor[0], wheelColor[1], wheelColor[2], 1, 1, 1, 100);
    var wheel4 = generateTubeM(14.6, 0, -10, wheelColor[0], wheelColor[1], wheelColor[2], 1, 1, 1, 100);
    var wheelConnect1 = generateTubeM(8.5, 0, -10, wheelColor[0], wheelColor[1], wheelColor[2], 7, 0.5, 0.5, 100);
    var wheelConnect2 = generateTubeM(8.5, 0, -4, wheelColor[0], wheelColor[1], wheelColor[2], 7, 0.5, 0.5, 100);
    var machine = generateCube(12, 2.1, -9, machineColor[0], machineColor[1], machineColor[2], 2, 0, 0, 0);
    var machineTop = generateTube(12, 3, -9, redColor[0], redColor[1], redColor[2], 0.2, 1, 1, 100);
    var handle1 = generateTube(11, 2, -11, wheelColor[0], wheelColor[1], wheelColor[2], 4, 0.2, 0.2, 100);
    var handle2 = generateTube(13, 2, -11, wheelColor[0], wheelColor[1], wheelColor[2], 4, 0.2, 0.2, 100);
    var handleConnect = generateTubeM(10.5, 6, -11, wheelColor[0], wheelColor[1], wheelColor[2], 3, 0.2, 0.2, 100);
    var cut = generateTube(12, -0.5, -3, machineColor[0], machineColor[1], machineColor[2], 1.25, 2, 2, 100);
    var leaf1 = generateSphere(7.5, 30, -18, bushColor1[0], bushColor1[1], bushColor1[2], 14, 100);
    
    var moon = generateSphere(7.5, 50, -18, bushColor1[0], bushColor1[1], bushColor1[2], 14, 100);

    // ROCK
    var rock1 = generateEllipsoid(-1.8 , -0.7, 3.5 , 1, 0.8, 1, rockColor1[0], rockColor1[1], rockColor1[2], 100);
    var rock2 = generateEllipsoid(-2.9 , -0.5, 1.9 , 1.2, 1, 1.3, rockColor2[0], rockColor2[1], rockColor2[2], 100);
    var rock3 = generateEllipsoid(-3.6 , -0.38, 0.1 , 1.4, 1.1, 1.1, rockColor2[0], rockColor2[1], rockColor2[2], 100);
    var rock4 = generateEllipsoid(-2.7 , -0.3, -1.8 , 1.7, 1.2, 1.5, rockColor1[0], rockColor1[1], rockColor1[2], 100);
    var rock5 = generateEllipsoid(-1.5 , -0.5, -3.4 , 1.5, 1, 1.4, rockColor2[0], rockColor2[1], rockColor2[2], 100);
    var rock6 = generateEllipsoid(1.8 , -0.45, -3.3 , 1.6, 1.06, 1.2, rockColor1[0], rockColor1[1], rockColor1[2], 100);
    var rock7 = generateEllipsoid(3.4 , -0.3, -1.7 , 1.5, 1.2, 1.4, rockColor2[0], rockColor2[1], rockColor2[2], 100);
    var rock8 = generateEllipsoid(3.8 , -0.37, 0.5 , 1.6, 1.15, 1.5, rockColor2[0], rockColor2[1], rockColor2[2], 100);
    var rock9 = generateEllipsoid(3.1 , -0.5, 2.2, 1.1, 1, 1.1, rockColor1[0], rockColor1[1], rockColor1[2], 100);
    var rock10 = generateEllipsoid(1.7 , -0.7, 3.5, 1.1, 0.8, 1.1, rockColor2[0], rockColor2[1], rockColor2[2], 100);
    var rock11 = generateEllipsoid(-0.1 , -0.8, 4, 1.2, 0.7, 1.1, rockColor2[0], rockColor2[1], rockColor2[2], 100);
    var littleRock = generateEllipsoid(0.2 , -0.7, -3.1 , 1, 0.8, 1.7, rockColor2[0], rockColor2[1], rockColor2[2], 100);
  
    // BODY
    var body = generateHalfSphere(0, 0, 0.55, bodyColor[0], bodyColor[1], bodyColor[2], 3.5, 100);
    var body2 = generateTube(0, -1.002, 0.05, bodyColor[0], bodyColor[1], bodyColor[2], 1, 3.5, 3.5, 100);
    var body3 = generateTube(0, -1.3, 0.05, rockColor2[0], rockColor2[1], rockColor2[2], 0.8, 3.3, 3.3, 100);
    var nose = generateEllipticParaboloid(0, 0.5, -4.2, 0.5, 0.5, signalColor[0], signalColor[1], signalColor[2], 100);
    // (0, 0, -4.5, 0.5, 0.5)
  
    // ANTENNA
    var antenna = generateTube(0, 1, 0, antennaColor[0], antennaColor[1], antennaColor[2], 3.5, 0.3, 0.3, 100);
    var signal = generateSphere(0, 5, 0.55, signalColor[0], signalColor[1], signalColor[2], 1, 100);
  
    // MATA
    var eye1 = generateEllipsoid(-1.3 , 1, 3 , 0.5, 0.6, 0.5, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    var eye2 = generateEllipsoid(1.3 , 1, 3 , 0.5, 0.6, 0.5, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    var ref1 = generateEllipsoid(-1.45, 1.25, 3.15, 0.2, 0.3, 0.2, eyeReflectColor[0], eyeReflectColor[1], eyeReflectColor[2], 100);
    var ref2 = generateEllipsoid(1.18, 1.25, 3.18, 0.2, 0.3, 0.2, eyeReflectColor[0], eyeReflectColor[1], eyeReflectColor[2], 100);
  
    // MOUTH
    var lips = generateHyperboloid(0, 0.3, 3.355, 0.35, 0.2, 0.11, lipsColor[0], lipsColor[1], lipsColor[2], 100);
    var insideMouth = generateEllipsoid(0, 0.25, 3.18 , 0.8, 0.49, 0.48, insideMouthColor[0], insideMouthColor[1], insideMouthColor[2], 100);
    var teeth1 = generateEllipsoid(-0.1 , 0.55, 3.5 , 0.15, 0.1, 0.1, teethColor[0], teethColor[1], teethColor[2], 100);
    var teeth2 = generateEllipsoid(0.1 , 0.55, 3.5 , 0.15, 0.1, 0.1, teethColor[0], teethColor[1], teethColor[2], 100);
  
    // BASE
    var BASE_VERTEX = createVertexBuffer(GL, base);
    var BASE_COLORS = createColorBuffer(GL, base);
    var BASE_FACES = createFacesBuffer(GL, base);

    var BASE2_VERTEX = createVertexBuffer(GL, base2);
    var BASE2_COLORS = createColorBuffer(GL, base2);
    var BASE2_FACES = createFacesBuffer(GL, base2);

    var LEAF1_VERTEX = createVertexBuffer(GL, leaf1);
    var LEAF1_COLORS = createColorBuffer(GL, leaf1);
    var LEAF1_FACES = createFacesBuffer(GL, leaf1);

    var BUSH1_VERTEX = createVertexBuffer(GL, bush1);
    var BUSH1_COLORS = createColorBuffer(GL, bush1);
    var BUSH1_FACES = createFacesBuffer(GL, bush1);

    var BUSH2_VERTEX = createVertexBuffer(GL, bush2);
    var BUSH2_COLORS = createColorBuffer(GL, bush2);
    var BUSH2_FACES = createFacesBuffer(GL, bush2);

    var HOUSE_VERTEX = createVertexBuffer(GL, house);
    var HOUSE_COLORS = createColorBuffer(GL, house);
    var HOUSE_FACES = createFacesBuffer(GL, house);

    var HOUSE2_VERTEX = createVertexBuffer(GL, house2);
    var HOUSE2_COLORS = createColorBuffer(GL, house2);
    var HOUSE2_FACES = createFacesBuffer(GL, house2);

    var ROOF_VERTEX = createVertexBuffer(GL, roof);
    var ROOF_COLORS = createColorBuffer(GL, roof);
    var ROOF_FACES = createFacesBuffer(GL, roof);

    var PILLAR1_VERTEX = createVertexBuffer(GL, pillar1);
    var PILLAR1_COLORS = createColorBuffer(GL, pillar1);
    var PILLAR1_FACES = createFacesBuffer(GL, pillar1);

    var PILLAR2_VERTEX = createVertexBuffer(GL, pillar2);
    var PILLAR2_COLORS = createColorBuffer(GL, pillar2);
    var PILLAR2_FACES = createFacesBuffer(GL, pillar2);

    var PILLAR3_VERTEX = createVertexBuffer(GL, pillar3);
    var PILLAR3_COLORS = createColorBuffer(GL, pillar3);
    var PILLAR3_FACES = createFacesBuffer(GL, pillar3);

    var PILLAR4_VERTEX = createVertexBuffer(GL, pillar4);
    var PILLAR4_COLORS = createColorBuffer(GL, pillar4);
    var PILLAR4_FACES = createFacesBuffer(GL, pillar4);

    var DOOR_VERTEX = createVertexBuffer(GL, door);
    var DOOR_COLORS = createColorBuffer(GL, door);
    var DOOR_FACES = createFacesBuffer(GL, door);

    var DOOR2_VERTEX = createVertexBuffer(GL, door2);
    var DOOR2_COLORS = createColorBuffer(GL, door2);
    var DOOR2_FACES = createFacesBuffer(GL, door2);

    var FENCE1_VERTEX = createVertexBuffer(GL, fence1);
    var FENCE1_COLORS = createColorBuffer(GL, fence1);
    var FENCE1_FACES = createFacesBuffer(GL, fence1);

    var FENCEC1_VERTEX = createVertexBuffer(GL, fenceConnect1);
    var FENCEC1_COLORS = createColorBuffer(GL, fenceConnect1);
    var FENCEC1_FACES = createFacesBuffer(GL, fenceConnect1);

    var FENCEC2_VERTEX = createVertexBuffer(GL, fenceConnect2);
    var FENCEC2_COLORS = createColorBuffer(GL, fenceConnect2);
    var FENCEC2_FACES = createFacesBuffer(GL, fenceConnect2);

    var FENCE2_VERTEX = createVertexBuffer(GL, fence2);
    var FENCE2_COLORS = createColorBuffer(GL, fence2);
    var FENCE2_FACES = createFacesBuffer(GL, fence2);

    var FENCEC3_VERTEX = createVertexBuffer(GL, fenceConnect3);
    var FENCEC3_COLORS = createColorBuffer(GL, fenceConnect3);
    var FENCEC3_FACES = createFacesBuffer(GL, fenceConnect3);

    var FENCEC4_VERTEX = createVertexBuffer(GL, fenceConnect4);
    var FENCEC4_COLORS = createColorBuffer(GL, fenceConnect4);
    var FENCEC4_FACES = createFacesBuffer(GL, fenceConnect4);

    var WINDOW1_VERTEX = createVertexBuffer(GL, window1);
    var WINDOW1_COLORS = createColorBuffer(GL, window1);
    var WINDOW1_FACES = createFacesBuffer(GL, window1);

    var WINDOW2_VERTEX = createVertexBuffer(GL, window2);
    var WINDOW2_COLORS = createColorBuffer(GL, window2);
    var WINDOW2_FACES = createFacesBuffer(GL, window2);

    var REDB_VERTEX = createVertexBuffer(GL, redBody);
    var REDB_COLORS = createColorBuffer(GL, redBody);
    var REDB_FACES = createFacesBuffer(GL, redBody);

    var WHEEL1_VERTEX = createVertexBuffer(GL, wheel1);
    var WHEEL1_COLORS = createColorBuffer(GL, wheel1);
    var WHEEL1_FACES = createFacesBuffer(GL, wheel1);

    var WHEEL2_VERTEX = createVertexBuffer(GL, wheel2);
    var WHEEL2_COLORS = createColorBuffer(GL, wheel2);
    var WHEEL2_FACES = createFacesBuffer(GL, wheel2);

    var WHEEL3_VERTEX = createVertexBuffer(GL, wheel3);
    var WHEEL3_COLORS = createColorBuffer(GL, wheel3);
    var WHEEL3_FACES = createFacesBuffer(GL, wheel3);

    var WHEEL4_VERTEX = createVertexBuffer(GL, wheel4);
    var WHEEL4_COLORS = createColorBuffer(GL, wheel4);
    var WHEEL4_FACES = createFacesBuffer(GL, wheel4);

    var WHEELC1_VERTEX = createVertexBuffer(GL, wheelConnect1);
    var WHEELC1_COLORS = createColorBuffer(GL, wheelConnect1);
    var WHEELC1_FACES = createFacesBuffer(GL, wheelConnect1);

    var WHEELC2_VERTEX = createVertexBuffer(GL, wheelConnect2);
    var WHEELC2_COLORS = createColorBuffer(GL, wheelConnect2);
    var WHEELC2_FACES = createFacesBuffer(GL, wheelConnect2);

    var MACHINE_VERTEX = createVertexBuffer(GL, machine);
    var MACHINE_COLORS = createColorBuffer(GL, machine);
    var MACHINE_FACES = createFacesBuffer(GL, machine);

    var MACHINET_VERTEX = createVertexBuffer(GL, machineTop);
    var MACHINET_COLORS = createColorBuffer(GL, machineTop);
    var MACHINET_FACES = createFacesBuffer(GL, machineTop);

    var HANDLE1_VERTEX = createVertexBuffer(GL, handle1);
    var HANDLE1_COLORS = createColorBuffer(GL, handle1);
    var HANDLE1_FACES = createFacesBuffer(GL, handle1);

    var HANDLE2_VERTEX = createVertexBuffer(GL, handle2);
    var HANDLE2_COLORS = createColorBuffer(GL, handle2);
    var HANDLE2_FACES = createFacesBuffer(GL, handle2);

    var HANDLEC_VERTEX = createVertexBuffer(GL, handleConnect);
    var HANDLEC_COLORS = createColorBuffer(GL, handleConnect);
    var HANDLEC_FACES = createFacesBuffer(GL, handleConnect);

    var CUT_VERTEX = createVertexBuffer(GL, cut);
    var CUT_COLORS = createColorBuffer(GL, cut);
    var CUT_FACES = createFacesBuffer(GL, cut);

    var TREE_VERTEX = createVertexBuffer(GL, tree);
    var TREE_COLORS = createColorBuffer(GL, tree);
    var TREE_FACES = createFacesBuffer(GL, tree);
  
    // ROCK
    var ROCK1_VERTEX = createVertexBuffer(GL, rock1);
    var ROCK1_COLORS = createColorBuffer(GL, rock1);
    var ROCK1_FACES = createFacesBuffer(GL, rock1);
  
    var ROCK2_VERTEX = createVertexBuffer(GL, rock2);
    var ROCK2_COLORS = createColorBuffer(GL, rock2);
    var ROCK2_FACES = createFacesBuffer(GL, rock2);
  
    var ROCK3_VERTEX = createVertexBuffer(GL, rock3);
    var ROCK3_COLORS = createColorBuffer(GL, rock3);
    var ROCK3_FACES = createFacesBuffer(GL, rock3);
  
    var ROCK4_VERTEX = createVertexBuffer(GL, rock4);
    var ROCK4_COLORS = createColorBuffer(GL, rock4);
    var ROCK4_FACES = createFacesBuffer(GL, rock4);
  
    var ROCK5_VERTEX = createVertexBuffer(GL, rock5);
    var ROCK5_COLORS = createColorBuffer(GL, rock5);
    var ROCK5_FACES = createFacesBuffer(GL, rock5);
  
    var ROCK6_VERTEX = createVertexBuffer(GL, rock6);
    var ROCK6_COLORS = createColorBuffer(GL, rock6);
    var ROCK6_FACES = createFacesBuffer(GL, rock6);
  
    var ROCK7_VERTEX = createVertexBuffer(GL, rock7);
    var ROCK7_COLORS = createColorBuffer(GL, rock7);
    var ROCK7_FACES = createFacesBuffer(GL, rock7);
  
    var ROCK8_VERTEX = createVertexBuffer(GL, rock8);
    var ROCK8_COLORS = createColorBuffer(GL, rock8);
    var ROCK8_FACES = createFacesBuffer(GL, rock8);
  
    var ROCK9_VERTEX = createVertexBuffer(GL, rock9);
    var ROCK9_COLORS = createColorBuffer(GL, rock9);
    var ROCK9_FACES = createFacesBuffer(GL, rock9);
  
    var ROCK10_VERTEX = createVertexBuffer(GL, rock10);
    var ROCK10_COLORS = createColorBuffer(GL, rock10);
    var ROCK10_FACES = createFacesBuffer(GL, rock10);
  
    var ROCK11_VERTEX = createVertexBuffer(GL, rock11);
    var ROCK11_COLORS = createColorBuffer(GL, rock11);
    var ROCK11_FACES = createFacesBuffer(GL, rock11);
  
    var LITTLEROCK_VERTEX = createVertexBuffer(GL, littleRock);
    var LITTLEROCK_COLORS = createColorBuffer(GL, littleRock);
    var LITTLEROCK_FACES = createFacesBuffer(GL, littleRock);
  
    // BODY
    var BODY_VERTEX = createVertexBuffer(GL, body);
    var BODY_COLORS = createColorBuffer(GL, body);
    var BODY_FACES = createFacesBuffer(GL, body);
  
    var BODY2_VERTEX = createVertexBuffer(GL, body2);
    var BODY2_COLORS = createColorBuffer(GL, body2);
    var BODY2_FACES = createFacesBuffer(GL, body2);
  
    var BODY3_VERTEX = createVertexBuffer(GL, body3);
    var BODY3_COLORS = createColorBuffer(GL, body3);
    var BODY3_FACES = createFacesBuffer(GL, body3);
  
    var NOSE_VERTEX = createVertexBuffer(GL, nose);
    var NOSE_COLORS = createColorBuffer(GL, nose);
    var NOSE_FACES = createFacesBuffer(GL, nose);
  
    // ANTENNA
    var ANTENNA_VERTEX = createVertexBuffer(GL, antenna);
    var ANTENNA_COLORS = createColorBuffer(GL, antenna);
    var ANTENNA_FACES = createFacesBuffer(GL, antenna);
  
    var SIGNAL_VERTEX = createVertexBuffer(GL, signal);
    var SIGNAL_COLORS = createColorBuffer(GL, signal);
    var SIGNAL_FACES = createFacesBuffer(GL, signal);
  
    // EYES
    var MATA1_VERTEX = createVertexBuffer(GL, eye1);
    var MATA1_COLORS = createColorBuffer(GL, eye1);
    var MATA1_FACES = createFacesBuffer(GL, eye1);
  
    var REF1_VERTEX = createVertexBuffer(GL, ref1);
    var REF1_COLORS = createColorBuffer(GL, ref1);
    var REF1_FACES = createFacesBuffer(GL, ref1);
  
    var MATA2_VERTEX = createVertexBuffer(GL, eye2);
    var MATA2_COLORS = createColorBuffer(GL, eye2);
    var MATA2_FACES = createFacesBuffer(GL, eye2);
  
    var REF2_VERTEX = createVertexBuffer(GL, ref2);
    var REF2_COLORS = createColorBuffer(GL, ref2);
    var REF2_FACES = createFacesBuffer(GL, ref2);
  
    // MOUTH
    var LIPS_VERTEX = createVertexBuffer(GL, lips);
    var LIPS_COLORS = createColorBuffer(GL, lips);
    var LIPS_FACES = createFacesBuffer(GL, lips);
  
    var INSIDEMOUTH_VERTEX = createVertexBuffer(GL, insideMouth);
    var INSIDEMOUTH_COLORS = createColorBuffer(GL, insideMouth);
    var INSIDEMOUTH_FACES = createFacesBuffer(GL, insideMouth);
  
    var TEETH1_VERTEX = createVertexBuffer(GL, teeth1);
    var TEETH1_COLORS = createColorBuffer(GL, teeth1);
    var TEETH1_FACES = createFacesBuffer(GL, teeth1);
  
    var TEETH2_VERTEX = createVertexBuffer(GL, teeth2);
    var TEETH2_COLORS = createColorBuffer(GL, teeth2);
    var TEETH2_FACES = createFacesBuffer(GL, teeth2);
    
    // Matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
    var VIEW_MATRIX = LIBS.get_I4();
    var MODEL_MATRIX = LIBS.get_I4();
    LIBS.translateZ(VIEW_MATRIX, -65);
  
    // Drawing
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    var time_prev = 0;
  
    var animateRock = function (time) {
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      var dt = time - time_prev;
      time_prev = time;
  
      if (!drag) {
        dx *= friction;
        dy *= friction;
  
        theta += (dx * 2 * Math.PI) / CANVAS.width;
        alpha += (dy * 2 * Math.PI) / CANVAS.height;
      }
      

      MODEL_MATRIX = LIBS.get_I4();
      LIBS.rotateY(MODEL_MATRIX, theta);
      LIBS.rotateX(MODEL_MATRIX, alpha);

  
      // BASE
      GL.bindBuffer(GL.ARRAY_BUFFER, LEAF1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, LEAF1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LEAF1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, leaf1.faces.length, GL.UNSIGNED_SHORT, 0);

      MODEL_MATRIX = LIBS.get_I4();
      LIBS.rotateY(MODEL_MATRIX, theta);
      LIBS.rotateX(MODEL_MATRIX, alpha);
      GL.bindBuffer(GL.ARRAY_BUFFER, BASE_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, BASE_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BASE_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, base.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, BASE2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, BASE2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BASE2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, base2.faces.length, GL.UNSIGNED_SHORT, 0);

    //   GL.bindBuffer(GL.ARRAY_BUFFER, BASE3_VERTEX);
    //   GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

    //   GL.bindBuffer(GL.ARRAY_BUFFER, BASE3_COLORS);
    //   GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
    //   GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BASE3_FACES);
      
    //   GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
    //   GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
    //   GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
    //   GL.drawElements(GL.TRIANGLES, base3.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, BUSH1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, BUSH1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BUSH1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, bush1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, BUSH2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, BUSH2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BUSH2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, bush2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HOUSE_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, house.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HOUSE2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HOUSE2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, house2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, ROOF_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, ROOF_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROOF_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, roof.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, PILLAR1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, pillar1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, PILLAR2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, pillar2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, PILLAR3_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, pillar3.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, PILLAR4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, PILLAR4_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, pillar4.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, DOOR_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, DOOR_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, DOOR_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, door.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, DOOR2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, DOOR2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, DOOR2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, door2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCE1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCE1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FENCE1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, fence1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FENCEC1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, fenceConnect1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FENCEC2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, fenceConnect2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCE2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCE2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FENCE2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, fence2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FENCEC3_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, fenceConnect3.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, FENCEC4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, FENCEC4_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, fenceConnect4.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WINDOW1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WINDOW1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WINDOW1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, window1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WINDOW2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WINDOW2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WINDOW2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, window2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, TREE_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, TREE_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TREE_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, tree.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, REDB_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, REDB_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, REDB_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, redBody.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WHEEL1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, wheel1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WHEEL2_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, wheel2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WHEEL3_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, wheel3.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEEL4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WHEEL4_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, wheel4.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEELC1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEELC1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WHEELC1_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, wheelConnect1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEELC2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, WHEELC2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, WHEELC2_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, wheelConnect2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, MACHINE_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, MACHINE_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MACHINE_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, machine.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, MACHINET_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, MACHINET_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MACHINET_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, machineTop.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HANDLE1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HANDLE1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HANDLE1_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, handle1.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HANDLE2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HANDLE2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HANDLE2_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, handle2.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HANDLEC_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, HANDLEC_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, HANDLEC_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, handleConnect.faces.length, GL.UNSIGNED_SHORT, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, CUT_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ARRAY_BUFFER, CUT_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUT_FACES);

      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.drawElements(GL.TRIANGLES, cut.faces.length, GL.UNSIGNED_SHORT, 0);    
  
      // ROCK
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK1_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock2.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK3_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock3.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK4_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK4_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK4_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock4.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK5_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK5_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK5_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock5.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK6_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK6_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK6_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock6.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK7_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK7_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK7_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock7.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK8_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK8_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK8_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock8.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK9_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK9_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK9_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock9.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK10_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK10_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK10_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock10.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK11_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, ROCK11_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ROCK11_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, rock11.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, LITTLEROCK_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, LITTLEROCK_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LITTLEROCK_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, littleRock.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.flush();
      window.requestAnimationFrame(animateRock);
    };
  
    var rotateBody = 0;
    var rotateBodySpeed = 0.08;
    var bodyRotationRange;
    var bodyRotationAngle;
  
    var animateBody = function (time) {
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
      var dt = time - time_prev;
      time_prev = time;
  
      if (!drag) {
        dx *= friction;
        dy *= friction;
  
        theta += (dx * 2 * Math.PI) / CANVAS.width;
        alpha += (dy * 2 * Math.PI) / CANVAS.height;
      }
  
      rotateBody += rotateBodySpeed;
      bodyRotationRange = Math.PI/32;
      bodyRotationAngle = Math.sin(rotateBody)*bodyRotationRange;

      MODEL_MATRIX = LIBS.get_I4();
      LIBS.rotateY(MODEL_MATRIX, bodyRotationAngle);
      LIBS.rotateY(MODEL_MATRIX, theta);
      LIBS.rotateX(MODEL_MATRIX, alpha);
  
      // BODY
      GL.bindBuffer(GL.ARRAY_BUFFER, BODY_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, BODY_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BODY_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, body.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, BODY2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, BODY2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BODY2_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, body2.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, BODY3_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, BODY3_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, BODY3_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, body3.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, NOSE_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, NOSE_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, NOSE_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, nose.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // EYES
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, eye1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, REF1_VERTEX); // Reflection 1
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, REF1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, REF1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, ref1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, MATA2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, MATA2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, eye2.faces.length, GL.UNSIGNED_SHORT, 0);
  
      var alis1 =[
        [1, 2.5, 3.2],
        [1.4, 2.7, 3.2],
        [1.7, 2.5, 3.2],
      ];
      var alis2 =[
        [-1, 2.5, 3.2],
        [-1.4, 2.7, 3.2],
        [-1.7, 2.5, 3.2],
      ];
  
      drawBezierCurve(GL,SHADER_PROGRAM,alis1,100);
      drawBezierCurve(GL,SHADER_PROGRAM,alis2,100);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, REF2_VERTEX); // Reflection 2
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, REF2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, REF2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, ref2.faces.length, GL.UNSIGNED_SHORT, 0);
  
      // MOUTH
      GL.bindBuffer(GL.ARRAY_BUFFER, LIPS_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, LIPS_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LIPS_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, lips.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, INSIDEMOUTH_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, INSIDEMOUTH_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, INSIDEMOUTH_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, insideMouth.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TEETH1_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TEETH1_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TEETH1_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, teeth1.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TEETH2_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TEETH2_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TEETH2_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, teeth2.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.flush();
      window.requestAnimationFrame(animateBody);
    };
  
    var rotateAntenna = 0;
    var rotateAntennaSpeed = 0.05;
    var antennaRotationRange;
    var antennaRotationAngle;
  
    var animateAntenna = function (time) {
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      var dt = time - time_prev;
      time_prev = time;
  
      if (!drag) {
        dx *= friction;
        dy *= friction;
  
        theta += (dx * 2 * Math.PI) / CANVAS.width;
        alpha += (dy * 2 * Math.PI) / CANVAS.height;
      }
  
      rotateAntenna += rotateAntennaSpeed;
      antennaRotationRange = Math.PI/48;
      antennaRotationAngle = Math.sin(rotateAntenna)*antennaRotationRange;

      var currentTime = Date.now();
      var translateZ = Math.sin(currentTime*0.005)*1;

      MODEL_MATRIX = LIBS.get_I4();
      LIBS.translateZ(MODEL_MATRIX, translateZ);
      LIBS.rotateX(MODEL_MATRIX, antennaRotationAngle);
      LIBS.rotateY(MODEL_MATRIX, theta);
      LIBS.rotateX(MODEL_MATRIX, alpha);
  
      // ANTENNA
      GL.bindBuffer(GL.ARRAY_BUFFER, ANTENNA_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ARRAY_BUFFER, ANTENNA_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
      
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, ANTENNA_FACES);
      
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.drawElements(GL.TRIANGLES, antenna.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, SIGNAL_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
        
      GL.bindBuffer(GL.ARRAY_BUFFER, SIGNAL_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
        
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, SIGNAL_FACES);
        
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
        
      GL.drawElements(GL.TRIANGLES, signal.faces.length, GL.UNSIGNED_SHORT, 0);
  
      GL.flush();
      window.requestAnimationFrame(animateAntenna);
    };

    //----------GELWIN----------//

    // COLOR
    var bodyColor = [255/255, 255/255, 0/255]
    var eyeColor = [235/255, 236/255, 240/255, 42/255, 42/255, 39/255]
    var leafGreenColor = [166/255, 214/255, 9/255]
    var redColor = [164/255, 42/255, 4/255]
    var leafGreenColor2 = [79/255, 121/255, 66/255]
    var leafGreenColor3 = [34/255, 139/255, 34/255]
    var leafGreenColor4 = [128/255, 128/255, 0/255]

    // var hidung = generateEllipticParaboloidN(1.55, 3.15, -4.5, 0.5, 0.5, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 100);
    // var headband = generateTorus(-1.65, 8, 0.25, redColor[0], redColor[1], redColor[2], 2.8, 0.3, 100, 100, 5, 0, 0);
    // var headband2 = generateSphere(-1.65, 8.5, -2.25, redColor[0], redColor[1], redColor[2], 0.75, 100);
    // var headband3 = generateTube(-1.65, 7, -3.25, redColor[0], redColor[1], redColor[2], 1, 0.5, 0.5, 100);
    // var plate = generateTube(-1.65, 11.7, -12, leafGreenColor4[0], leafGreenColor4[1], leafGreenColor4[2], 2.5, 2.5, 3.5, 100);
    // var ammunition = generateSphere(-1.65, 14.75, -12, bodyColor[0], bodyColor[1], bodyColor[2], 1.75, 100);
    // //tangkai horizontal
    // var tangkai1 = generateHyperboloid(-1.65, 11, -6, 0.3, 0.3, 3.65, leafGreenColor2[0], leafGreenColor2[1], leafGreenColor2[2], 100);
    // //tangkai vertikal
    // var tangkai2 = generateTube(-1.65, 10.5, -12, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 1.25, 0.5, 0.5, 100);
    // var pucuk = generateTube(-1.65, 9.5, 0, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 1.95, 0.5, 0.5, 100);
    // var badanAtas = generateTube(-1.65, 7.5, 0, bodyColor[0], bodyColor[1], bodyColor[2], 2, 2.8, 1.75, 100);
    // var badanTengah = generateTube(-1.65, 4, 0, bodyColor[0], bodyColor[1], bodyColor[2], 3.5, 3.65, 2.8, 100);
    // var badanBawah = generateTube(-1.65, 0, 0, bodyColor[0], bodyColor[1], bodyColor[2], 4, 4, 3.65, 100);
    // //mata kiri 
    // var mata1G = generateEllipsoid(-2.3, 4, 3.4, 0.5, 0.6, 0.45, eyeColor[3], eyeColor[4], eyeColor[5], 100);
    // var mata2G = generateEllipsoid(-2.3, 4, 3.85, 0.2, 0.3, 0.2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    // //mata kanan
    // var mata3G = generateEllipsoid(-0.8, 4, 3.4, 0.5, 0.6, 0.45, eyeColor[3], eyeColor[4], eyeColor[5], 100);
    // var mata4G = generateEllipsoid(-0.8, 4, 3.85, 0.2, 0.3, 0.2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    // //daun kiri depan
    // var daunKiri = generateHalfSphere(-7.85, 0, 6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    // //daun kiri belakang
    // var daunKiri2 = generateHalfSphere(-7.85, 0, -6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    // //daun kanan depan
    // var daunKanan = generateHalfSphere(4.85, 0, 6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    // //daun kanan belakang
    // var daunKanan2 = generateHalfSphere(4.85, 0, -6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    // var alas = generateEllipsoid(-1.55, 0, 0, 7, 0.4, 7, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 100);

    var hidung = generateEllipticParaboloidN(10.55, 2, -14.5, 0.5, 0.5, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 100);
    var headband = generateTorus(-10.65, 7, 10, redColor[0], redColor[1], redColor[2], 2.8, 0.3, 100, 100, 5, 0, 0);
    var headband2 = generateSphere(-10.65, 7.5, 7.5, redColor[0], redColor[1], redColor[2], 0.75, 100);
    var headband3 = generateTube(-10.65, 6, 7, redColor[0], redColor[1], redColor[2], 1, 0.5, 0.5, 100);
    var plate = generateTube(-10.65, 11.7, 1.5, leafGreenColor4[0], leafGreenColor4[1], leafGreenColor4[2], 2.5, 2.5, 3.5, 100);
    var ammunition = generateSphere(-10.65, 14.75, 2, bodyColor[0], bodyColor[1], bodyColor[2], 1.75, 100);
    //tangkai horizontal
    var tangkai1 = generateHyperboloid(-10.65, 11, 6.3, 0.3, 0.3, 2.75, leafGreenColor2[0], leafGreenColor2[1], leafGreenColor2[2], 100);
    //tangkai vertikal
    var tangkai2 = generateTube(-10.65, 10.5, 2, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 1.25, 0.5, 0.5, 100);
    var pucuk = generateTube(-10.65, 6.5, 10, leafGreenColor3[0], leafGreenColor3[1], leafGreenColor3[2], 4, 0.5, 0.5, 100);
    var badanAtas = generateTube(-10.65, 6.5, 10, bodyColor[0], bodyColor[1], bodyColor[2], 2, 2.8, 1.75, 100);
    var badanTengah = generateTube(-10.65, 3, 10, bodyColor[0], bodyColor[1], bodyColor[2], 3.5, 3.65, 2.8, 100);
    var badanBawah = generateTube(-10.65, -1, 10, bodyColor[0], bodyColor[1], bodyColor[2], 4, 4, 3.65, 100);
    //mata kiri 
    var mata1G = generateEllipsoid(-11.3, 3, 13.4, 0.5, 0.6, 0.45, eyeColor[3], eyeColor[4], eyeColor[5], 100);
    var mata2G = generateEllipsoid(-11.3, 3, 13.85, 0.2, 0.3, 0.2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    //mata kanan
    var mata3G = generateEllipsoid(-9.8, 3, 13.4, 0.5, 0.6, 0.45, eyeColor[3], eyeColor[4], eyeColor[5], 100);
    var mata4G = generateEllipsoid(-9.8, 3, 13.85, 0.2, 0.3, 0.2, eyeColor[0], eyeColor[1], eyeColor[2], 100);
    //daun kiri depan
    var daunKiri = generateHalfSphere(-16.85, -1, 6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    //daun kiri belakang
    var daunKiri2 = generateHalfSphere(-16.85, -1, -6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    //daun kanan depan
    var daunKanan = generateHalfSphere(-5.15, -1, 6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    //daun kanan belakang
    var daunKanan2 = generateHalfSphere(-5.15, -1, -6.5, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 3, 100);
    var alas = generateEllipsoid(-10.65, -1, 10, 7, 0.8, 7, leafGreenColor[0], leafGreenColor[1], leafGreenColor[2], 100);

    var DAUNKIRI_VERTEX = createVertexBuffer(GL, daunKiri);
    var DAUNKIRI_COLORS = createColorBuffer(GL, daunKiri);
    var DAUNKIRI_FACES = createFacesBuffer(GL, daunKiri);

    var DAUNKIRI2_VERTEX = createVertexBuffer(GL, daunKiri2);
    var DAUNKIRI2_COLORS = createColorBuffer(GL, daunKiri2);
    var DAUNKIRI2_FACES = createFacesBuffer(GL, daunKiri2);

    var DAUNKANAN_VERTEX = createVertexBuffer(GL, daunKanan);
    var DAUNKANAN_COLORS = createColorBuffer(GL, daunKanan);
    var DAUNKANAN_FACES = createFacesBuffer(GL, daunKanan);

    var DAUNKANAN2_VERTEX = createVertexBuffer(GL, daunKanan2);
    var DAUNKANAN2_COLORS = createColorBuffer(GL, daunKanan2);
    var DAUNKANAN2_FACES = createFacesBuffer(GL, daunKanan2);

    var AMMUNTION_VERTEX = createVertexBuffer(GL, ammunition);
    var AMMUNTION_COLORS = createColorBuffer(GL, ammunition);
    var AMMUNTION_FACES = createFacesBuffer(GL, ammunition);

    var HEADBAND_VERTEX = createVertexBuffer(GL, headband);
    var HEADBAND_COLORS = createColorBuffer(GL, headband);
    var HEADBAND_FACES = createFacesBuffer(GL, headband);

    var HIDUNG_VERTEX = createVertexBuffer(GL, hidung);
    var HIDUNG_COLORS = createColorBuffer(GL, hidung);
    var HIDUNG_FACES = createFacesBuffer(GL, hidung);

    var HEADBAND2_VERTEX = createVertexBuffer(GL, headband2);
    var HEADBAND2_COLORS = createColorBuffer(GL, headband2);
    var HEADBAND2_FACES = createFacesBuffer(GL, headband2);

    var HEADBAND3_VERTEX = createVertexBuffer(GL, headband3);
    var HEADBAND3_COLORS = createColorBuffer(GL, headband3);
    var HEADBAND3_FACES = createFacesBuffer(GL, headband3);

    var TANGKAI1_VERTEX = createVertexBuffer(GL, tangkai1);
    var TANGKAI1_COLORS = createColorBuffer(GL, tangkai1);
    var TANGKAI1_FACES = createFacesBuffer(GL, tangkai1);

    var PLATE_VERTEX = createVertexBuffer(GL, plate);
    var PLATE_COLORS = createColorBuffer(GL, plate);
    var PLATE_FACES = createFacesBuffer(GL, plate);

    var TANGKAI2_VERTEX = createVertexBuffer(GL, tangkai2);
    var TANGKAI2_COLORS = createColorBuffer(GL, tangkai2);
    var TANGKAI2_FACES = createFacesBuffer(GL, tangkai2);

    var PUCUK_VERTEX = createVertexBuffer(GL, pucuk);
    var PUCUK_COLORS = createColorBuffer(GL, pucuk);
    var PUCUK_FACES = createFacesBuffer(GL, pucuk);

    var ALAS_VERTEX = createVertexBuffer(GL, alas);
    var ALAS_COLORS = createColorBuffer(GL, alas);
    var ALAS_FACES = createFacesBuffer(GL, alas);

    var MATA1_VERTEXG = createVertexBuffer(GL, mata1G);
    var MATA1_COLORSG = createColorBuffer(GL, mata1G);
    var MATA1_FACESG = createFacesBuffer(GL, mata1G);
  
    var MATA2_VERTEXG = createVertexBuffer(GL, mata2G);
    var MATA2_COLORSG = createColorBuffer(GL, mata2G);
    var MATA2_FACESG = createFacesBuffer(GL, mata2G);

    var MATA3_VERTEXG = createVertexBuffer(GL, mata3G);
    var MATA3_COLORSG = createColorBuffer(GL, mata3G);
    var MATA3_FACESG = createFacesBuffer(GL, mata3G);
  
    var MATA4_VERTEXG = createVertexBuffer(GL, mata4G);
    var MATA4_COLORSG = createColorBuffer(GL, mata4G);
    var MATA4_FACESG = createFacesBuffer(GL, mata4G);
  
    var BADAN_TENGAH_VERTEX = createVertexBuffer(GL, badanTengah);
    var BADAN_TENGAH_COLORS = createColorBuffer(GL, badanTengah);
    var BADAN_TENGAH_FACES = createFacesBuffer(GL, badanTengah);

    var BADAN_ATAS_VERTEX = createVertexBuffer(GL, badanAtas);
    var BADAN_ATAS_COLORS = createColorBuffer(GL, badanAtas);
    var BADAN_ATAS_FACES = createFacesBuffer(GL, badanAtas);
  
    var BADAN_BAWAH_VERTEX = createVertexBuffer(GL, badanBawah);
    var BADAN_BAWAH_COLORS = createColorBuffer(GL, badanBawah);
    var BADAN_BAWAH_FACES = createFacesBuffer(GL, badanBawah);
  
    // Matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
    var VIEW_MATRIX = LIBS.get_I4();
    var MODEL_MATRIX = LIBS.get_I4();
    LIBS.translateZ(VIEW_MATRIX, -65);
  
    //DRAWING
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    var time_prev = 0;

    function drawObject(vertexBuffer, colorBuffer, indexBuffer, faces) {
        GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ARRAY_BUFFER, colorBuffer);
        GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
        GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
        GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
        GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
    
        GL.drawElements(GL.TRIANGLES, faces.length, GL.UNSIGNED_SHORT, 0);
    }

    var rotateFace = 0;
    var rotateSpeed = 0.03;
    var faceRotationRange;
    var faceRotationAngle;

    var animateFace = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);
        var dt = time - time_prev;
        time_prev = time;

        if (!drag) {
            dx *= friction;
            dy *= friction;
        
            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }

        rotateFace += rotateSpeed; // Speed
        faceRotationRange = Math.PI / 256; // Jarak
        faceRotationAngle = Math.sin(rotateFace) * faceRotationRange; // Sudut

        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateX(MODEL_MATRIX, faceRotationAngle);
        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);
        
        // Draw each object
        drawObject(MATA1_VERTEXG, MATA1_COLORSG, MATA1_FACESG, mata1G.faces); // Mata kiri
        drawObject(MATA2_VERTEXG, MATA2_COLORSG, MATA2_FACESG, mata2G.faces); // Mata kiri
        drawObject(MATA3_VERTEXG, MATA3_COLORSG, MATA3_FACESG, mata3G.faces); // Mata kanan
        drawObject(MATA4_VERTEXG, MATA4_COLORSG, MATA4_FACESG, mata4G.faces); // Mata kanan
        drawObject(BADAN_TENGAH_VERTEX, BADAN_TENGAH_COLORS, BADAN_TENGAH_FACES, badanTengah.faces); // Badan tengah
        drawObject(BADAN_ATAS_VERTEX, BADAN_ATAS_COLORS, BADAN_ATAS_FACES, badanAtas.faces); // Badan atas
        drawObject(BADAN_BAWAH_VERTEX, BADAN_BAWAH_COLORS, BADAN_BAWAH_FACES, badanBawah.faces); // Badan bawah
        drawObject(HEADBAND_VERTEX, HEADBAND_COLORS, HEADBAND_FACES, headband.faces); // Headband
        drawObject(HEADBAND3_VERTEX, HEADBAND3_COLORS, HEADBAND3_FACES, headband3.faces); // Headband3
        drawObject(HEADBAND2_VERTEX, HEADBAND2_COLORS, HEADBAND2_FACES, headband2.faces); // Headband2
        drawObject(HIDUNG_VERTEX, HIDUNG_COLORS, HIDUNG_FACES, hidung.faces); // Hidung
        
        var alisKiri =[
            [-12.5, 4, 13.75],
            [-11.5, 5.5, 13.75],
            [-10.7, 4, 13.75],
        ];
        
        var alisKanan =[
            [-8.5, 4, 13.75],
            [-9.5, 5.5, 13.75],
            [-10.3, 4, 13.75],
        ];
        drawBezierCurve(GL,SHADER_PROGRAM,alisKiri,100);
        drawBezierCurve(GL,SHADER_PROGRAM,alisKanan,100);

        GL.flush();
        window.requestAnimationFrame(animateFace);
    };

    var animateAlas = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);
        var dt = time - time_prev;
        time_prev = time;

        if (!drag) {
        dx *= friction;
        dy *= friction;

        theta += (dx * 2 * Math.PI) / CANVAS.width;
        alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }
        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);

        drawObject(ALAS_VERTEX, ALAS_COLORS, ALAS_FACES, alas.faces);
        GL.flush();

        window.requestAnimationFrame(animateAlas);
    };

    var throwAmmunition = 0;
    var throwRange;
    var throwAngle;
    var throwAmmuntionSpeed = 0.03;

    var animateUpper = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);
        var dt = time - time_prev;
        time_prev = time;

        if (!drag) {
            dx = friction;
            dy= friction;

            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }

        throwAmmunition += throwAmmuntionSpeed;
        throwRange = Math.PI / 12;
        throwAngle = Math.sin(throwAmmunition) * throwRange / 2;

        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateX(MODEL_MATRIX, throwAngle);
        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);

        drawObject(TANGKAI2_VERTEX, TANGKAI2_COLORS, TANGKAI2_FACES, tangkai2.faces); // Tangkai2
        drawObject(AMMUNTION_VERTEX, AMMUNTION_COLORS, AMMUNTION_FACES, ammunition.faces); // Ammunition
        drawObject(TANGKAI1_VERTEX, TANGKAI1_COLORS, TANGKAI1_FACES, tangkai1.faces); // Tangkai1
        drawObject(PLATE_VERTEX, PLATE_COLORS, PLATE_FACES, plate.faces); // Plate
        drawObject(PUCUK_VERTEX, PUCUK_COLORS, PUCUK_FACES, pucuk.faces); // Pucuk


        GL.flush();
        window.requestAnimationFrame(animateUpper);
    };


    //------SUNFLOWER------//

    //------SUNFLOWER------//

    //--COLOR--//
    var HEAD_RGB = [179 / 255, 99 / 255, 42 / 255];
    var BODY_RGB = [56 / 255, 164 / 255, 61 / 255];
    var LEAF_RGB = [91 / 255, 194 / 255, 52 / 255];
    var CROWN_RGB = [239 / 255, 211 / 255, 20 / 255];
    var EYE_RGB = [];
    var HALO_RGB = [255 / 255, 255 / 255, 255 / 255];

    var HEAD = generateEllipsoid(12, 6, -8, 1.4, 1.1, 1.1, HEAD_RGB[0], HEAD_RGB[1], HEAD_RGB[2], 100);
    var BODY = generateTube(12, 3, -8, BODY_RGB[0], BODY_RGB[1], BODY_RGB[2], 4, 0.15, 0.15, 100);
    //-LEAF-//
    var LEAF = generateEllipticParaboloid(12, 3, -9, 0.3, 0.3, LEAF_RGB[0], LEAF_RGB[1], LEAF_RGB[2], 100);
    var LEAF2 = generateEllipticParaboloid2(12, 9, -11, 0.3, 0.3, LEAF_RGB[0], LEAF_RGB[1], LEAF_RGB[2], 100);
    var LEAFSAMPING = generateHalfSphere(12.4, 2.9, -7, LEAF_RGB[0], LEAF_RGB[1], LEAF_RGB[2], 0.5, 200);
    var LEAFSAMPING2 = generateHalfSphere(11.6, 2.9, -7, LEAF_RGB[0], LEAF_RGB[1], LEAF_RGB[2], 0.5, 200);
    var EYE_LEFT = generateEllipsoid(11.6, 6.1, -7, 0.1, 0.2, 0.1, EYE_RGB[0], EYE_RGB[1], EYE_RGB[2], 100)
    var EYE_RIGHT = generateEllipsoid(12.4, 6.1, -7, 0.1, 0.2, 0.1, EYE_RGB[0], EYE_RGB[1], EYE_RGB[2], 100)
    //-CROWN NORTH SIDE-//
    var CROWN_NORTH = generateEllipsoid(12, 7, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN1 = generateEllipsoid(12.5, 6.8, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN2 = generateEllipsoid(13, 6.4, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    //-CROWN SOUTH SIDE-//
    var CROWN_SOUTH = generateEllipsoid(12, 5, -8, 0.5, 0.65, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN3 = generateEllipsoid(11, 5.6, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN4 = generateEllipsoid(11.5, 5.2, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    //-CROWN EAST SIDE-//
    var CROWN_EAST = generateEllipsoid(13, 6, -8, 0.85, 0.5, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN5 = generateEllipsoid(12.5, 5.2, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN6 = generateEllipsoid(13, 5.6, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    //-CROWN WEST SIDE-//
    var CROWN_WEST = generateEllipsoid(11, 6, -8, 0.85, 0.5, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN7 = generateEllipsoid(11.5, 6.8, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    var CROWN8 = generateEllipsoid(11, 6.4, -8, 0.5, 0.75, 0.5, CROWN_RGB[0], CROWN_RGB[1], CROWN_RGB[2], 100);
    //-HALO-//
    var HALO = generateTorus(12, 8.5, -8, HALO_RGB[0], HALO_RGB[1], HALO_RGB[2], 1, 0.1, 100, 100, 1.6, 0, 0);
    var SMILE = [
        [11.3, 6, -7.1],
        [12, 5.5, -7.1],
        [12.7, 6, -7.1],
    ];
    var SMILE_CORNER1 = [
        [11.2, 5.8, -7.1],
        [11.4, 6, -7.1],
        [11.2, 6.2, -7.1],
    ];
    var SMILE_CORNER2 = [
        [12.8, 5.8, -7.1],
        [12.6, 6, -7.1],
        [12.8, 6.2, -7.1],
    ];




    //--CREATE BUFFER--//
    //-HEAD-//
    var HEAD_VERTEX = createVertexBuffer(GL, HEAD);
    var HEAD_COLOR = createColorBuffer(GL, HEAD);
    var HEAD_FACES = createFacesBuffer(GL, HEAD);

    //-BODY-//
    var BODYS_VERTEX = createVertexBuffer(GL, BODY);
    var BODYS_COLOR = createColorBuffer(GL, BODY);
    var BODYS_FACES = createFacesBuffer(GL, BODY);

    //-LEAF-//
    var LEAF_VERTEX = createVertexBuffer(GL, LEAF);
    var LEAF_COLOR = createColorBuffer(GL, LEAF);
    var LEAF_FACES = createFacesBuffer(GL, LEAF);

    var LEAF2_VERTEX = createVertexBuffer(GL, LEAF2);
    var LEAF2_COLOR = createColorBuffer(GL, LEAF2);
    var LEAF2_FACES = createFacesBuffer(GL, LEAF2);

    var LEAFSAMPING_VERTEX = createVertexBuffer(GL, LEAFSAMPING);
    var LEAFSAMPING_COLOR = createColorBuffer(GL, LEAFSAMPING);
    var LEAFSAMPING_FACES = createFacesBuffer(GL, LEAFSAMPING);

    var LEAFSAMPING2_VERTEX = createVertexBuffer(GL, LEAFSAMPING2);
    var LEAFSAMPING2_COLOR = createColorBuffer(GL, LEAFSAMPING2);
    var LEAFSAMPING2_FACES = createFacesBuffer(GL, LEAFSAMPING2);

    //-EYES-//
    var EYE_LEFT_VERTEX = createVertexBuffer(GL, EYE_LEFT);
    var EYE_LEFT_COLOR = createColorBuffer(GL, EYE_LEFT);
    var EYE_LEFT_FACES = createFacesBuffer(GL, EYE_LEFT);

    var EYE_RIGHT_VERTEX = createVertexBuffer(GL, EYE_RIGHT);
    var EYE_RIGHT_COLOR = createColorBuffer(GL, EYE_RIGHT);
    var EYE_RIGHT_FACES = createFacesBuffer(GL, EYE_RIGHT);

    //-AXIS CROWN-//
    var CROWN_NORTH_VERTEX = createVertexBuffer(GL, CROWN_NORTH);
    var CROWN_RGB = createColorBuffer(GL, CROWN_NORTH);
    var CROWN_NORTH_FACES = createFacesBuffer(GL, CROWN_NORTH);

    var CROWN_SOUTH_VERTEX = createVertexBuffer(GL, CROWN_SOUTH);
    var CROWN_SOUTH_COLOR = createColorBuffer(GL, CROWN_SOUTH);
    var CROWN_SOUTH_FACES = createFacesBuffer(GL, CROWN_SOUTH);

    var CROWN_EAST_VERTEX = createVertexBuffer(GL, CROWN_EAST);
    var CROWN_EAST_COLOR = createColorBuffer(GL, CROWN_EAST);
    var CROWN_EAST_FACES = createFacesBuffer(GL, CROWN_EAST);

    var CROWN_WEST_VERTEX = createVertexBuffer(GL, CROWN_WEST);
    var CROWN_WEST_COLOR = createColorBuffer(GL, CROWN_WEST);
    var CROWN_WEST_FACES = createFacesBuffer(GL, CROWN_WEST);

    //-OTHER CROWNS-//
    var CROWN1_VERTEX = createVertexBuffer(GL, CROWN1);
    var CROWN1_COLOR = createColorBuffer(GL, CROWN1);
    var CROWN1_FACES = createFacesBuffer(GL, CROWN1);

    var CROWN2_VERTEX = createVertexBuffer(GL, CROWN2);
    var CROWN2_COLOR = createColorBuffer(GL, CROWN2);
    var CROWN2_FACES = createFacesBuffer(GL, CROWN2);

    var CROWN3_VERTEX = createVertexBuffer(GL, CROWN3);
    var CROWN3_COLOR = createColorBuffer(GL, CROWN3);
    var CROWN3_FACES = createFacesBuffer(GL, CROWN3);

    var CROWN4_VERTEX = createVertexBuffer(GL, CROWN4);
    var CROWN4_COLOR = createColorBuffer(GL, CROWN4);
    var CROWN4_FACES = createFacesBuffer(GL, CROWN4);

    var CROWN5_VERTEX = createVertexBuffer(GL, CROWN5);
    var CROWN5_COLOR = createColorBuffer(GL, CROWN5);
    var CROWN5_FACES = createFacesBuffer(GL, CROWN5);

    var CROWN6_VERTEX = createVertexBuffer(GL, CROWN6);
    var CROWN6_COLOR = createColorBuffer(GL, CROWN6);
    var CROWN6_FACES = createFacesBuffer(GL, CROWN6);

    var CROWN7_VERTEX = createVertexBuffer(GL, CROWN7);
    var CROWN7_COLOR = createColorBuffer(GL, CROWN7);
    var CROWN7_FACES = createFacesBuffer(GL, CROWN7);

    var CROWN8_VERTEX = createVertexBuffer(GL, CROWN8);
    var CROWN8_COLOR = createColorBuffer(GL, CROWN8);
    var CROWN8_FACES = createFacesBuffer(GL, CROWN8);

    //-CURVED TRIANGLE-//
    var SMILE_VERTEX = createVertexBuffer(GL, SMILE);
    var SMILE_COLOR = createColorBuffer(GL, SMILE);
    var SMILE_FACES = createFacesBuffer(GL, SMILE);

    //-HALO-//
    var HALO_VERTEX = createVertexBuffer(GL, HALO);
    var HALO_COLOR = createColorBuffer(GL, HALO);
    var HALO_FACES = createFacesBuffer(GL, HALO);

    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 1, 100);
    var VIEW_MATRIX = LIBS.get_I4();
    var MODEL_MATRIX = LIBS.get_I4();

    LIBS.translateZ(VIEW_MATRIX, -65);

    //buat speed muter
    var rotation = 0;
    var rotationRange;
    var rotationAngle;
    var animationSpeed = 0.005;
    var translationSpeed = 0.005;
    var maxXTranslation = 2; 
    var minXTranslation = -2; 
    var maxYTranslation = 2; 
    var minYTranslation = -1; 
    var maxZTranslation = 5; 
    var minZTranslation = 0; 

    var translationLimitY = 1;
    var translationLimitZ = 0;

    var scaleFactor = 1.0;

    //initial xyz
    xInitial = 0;
    yInitial = 0;
    zInitial = 0;

    var angle = 0;
    var radius = 1;

    /*========================= DRAWING ========================= */
    GL.clearColor(0.0, 0.0, 0.0, 0.0);

    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);

    var time_prev = 0;

    function drawObject(vertexBuffer, colorBuffer, indexBuffer, faces) {
        GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ARRAY_BUFFER, colorBuffer);
        GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);

        GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
        GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
        GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

        GL.drawElements(GL.TRIANGLES, faces.length, GL.UNSIGNED_SHORT, 0);
    }

    //-----ANIMASI KEPALA-----/
    var animateHead = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);

        var dt = time - time_prev;
        time_prev = time;

        MODEL_MATRIX = LIBS.get_I4();

        //--MOVEMENT--//

        //-DYNAMIC MOVEMENT-//
        //digeser mouse
        if (!drag) {
            dx *= friction;
            dy *= friction;

            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }

        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);

        //-STATIC MOVEMENT-//
        //geleng-geleng kepala

        rotation += animationSpeed; //speed muter

        rotationRange = Math.PI / 10; //jarak geleng2

        rotationAngle = Math.sin(rotation) * rotationRange; //sudut geleng2

        axis = [12, 6, -8];

        LIBS.rotateArbitraryAxis(MODEL_MATRIX, rotationAngle, axis);


        //-----BAGIAN KEPALA-----//

        //--DRAWING HEAD--//
        drawObject(HEAD_VERTEX, HEAD_COLOR, HEAD_FACES, HEAD.faces);

        //--DRAWING LEFT EYE--//
        drawObject(EYE_LEFT_VERTEX, EYE_LEFT_COLOR, EYE_LEFT_FACES, EYE_LEFT.faces);

        //--DRAWING RIGHT EYE--//
        drawObject(EYE_RIGHT_VERTEX, EYE_RIGHT_COLOR, EYE_RIGHT_FACES, EYE_RIGHT.faces);

        drawBezierCurve(GL, SHADER_PROGRAM, SMILE, 100);
        drawBezierCurve(GL, SHADER_PROGRAM, SMILE_CORNER1, 100);
        drawBezierCurve(GL, SHADER_PROGRAM, SMILE_CORNER2, 100);

        //--DRAWING HALO--//
        drawObject(HALO_VERTEX, HALO_COLOR, HALO_FACES, HALO.faces);

        //--DRAWING CROWN_NORTH--//
        drawObject(CROWN_NORTH_VERTEX, CROWN1_COLOR, CROWN_NORTH_FACES, CROWN_NORTH.faces);

        //--DRAWING CROWN_SOUTH--//
        drawObject(CROWN_SOUTH_VERTEX, CROWN_SOUTH_COLOR, CROWN_SOUTH_FACES, CROWN_SOUTH.faces);

        //--DRAWING CROWN_EAST--//
        drawObject(CROWN_EAST_VERTEX, CROWN_EAST_COLOR, CROWN_EAST_FACES, CROWN_EAST.faces);

        //--DRAWING CROWN_WEST--//
        drawObject(CROWN_WEST_VERTEX, CROWN_WEST_COLOR, CROWN_WEST_FACES, CROWN_WEST.faces);

        //--DRAWING CROWN1--//
        drawObject(CROWN1_VERTEX, CROWN1_COLOR, CROWN1_FACES, CROWN1.faces);

        //--DRAWING CROWN2--//
        drawObject(CROWN2_VERTEX, CROWN2_COLOR, CROWN2_FACES, CROWN2.faces);

        //--DRAWING CROWN3--//
        drawObject(CROWN3_VERTEX, CROWN3_COLOR, CROWN3_FACES, CROWN3.faces);

        //--DRAWING CROWN4--//
        drawObject(CROWN4_VERTEX, CROWN4_COLOR, CROWN4_FACES, CROWN4.faces);

        //--DRAWING CROWN5--//
        drawObject(CROWN5_VERTEX, CROWN5_COLOR, CROWN5_FACES, CROWN5.faces);

        //--DRAWING CROWN6--//
        drawObject(CROWN6_VERTEX, CROWN6_COLOR, CROWN6_FACES, CROWN6.faces);

        //--DRAWING CROWN7--//
        drawObject(CROWN7_VERTEX, CROWN7_COLOR, CROWN7_FACES, CROWN7.faces);

        //--DRAWING CROWN8--//
        drawObject(CROWN8_VERTEX, CROWN8_COLOR, CROWN8_FACES, CROWN8.faces);

        GL.flush();

        window.requestAnimationFrame(animateHead);
    };

    //-----ANIMATE BODY-----//
    var animateBodySunflower = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);

        var dt = time - time_prev;
        time_prev = time;

        //-DYNAMIC MOVEMENT-//
        //digeser mouse
        if (!drag) {
            dx *= friction;
            dy *= friction;

            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }
        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);

        //mindahin posisi awal
        // LIBS.translateX(MODEL_MATRIX, 6);
        // LIBS.translateY(MODEL_MATRIX, 6);
        // LIBS.translateZ(MODEL_MATRIX, 6);
        

        //-STATIC MOVEMENT-//
        //geleng-geleng kepala
        rotation += animationSpeed; //speed muter

        rotationRange = Math.PI / 4; //jarak geleng2

        rotationAngle = Math.sin(rotation) * rotationRange; //sudut geleng2

        // LIBS.rotateY(MODEL_MATRIX, rotationAngle); //buat muter


        //-----BAGIAN TUBUH-----//

        //--DRAWING BODY--//
        drawObject(BODYS_VERTEX, BODYS_COLOR, BODYS_FACES, BODY.faces);

        GL.flush();

        window.requestAnimationFrame(animateBodySunflower);
    };

    var animateFeet = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);

        var dt = time - time_prev;
        time_prev = time;

        //--MOVEMENT--//

        //-DYNAMIC MOVEMENT-//
        //digeser mouse
        if (!drag) {
            dx *= friction;
            dy *= friction;

            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }
        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);

        //mindahin posisi awal
        // LIBS.translateX(MODEL_MATRIX, 6);
        // LIBS.translateY(MODEL_MATRIX, 6);
        // LIBS.translateZ(MODEL_MATRIX, 6);


        //-STATIC MOVEMENT-//

        //-ROTATION-//
        //geleng-geleng kepala
        rotation += animationSpeed; //speed muter

        rotationRange = Math.PI / 4; //jarak geleng2

        rotationAngle = Math.sin(rotation) * rotationRange; //sudut geleng2

        // LIBS.rotateY(MODEL_MATRIX, rotationAngle); //buat muter

        //-----BAGIAN KAKI-----//

        //--DRAWING LEAF--//
        drawObject(LEAF_VERTEX, LEAF_COLOR, LEAF_FACES, LEAF.faces);

        GL.flush();

        window.requestAnimationFrame(animateFeet);
    };

    //---DRAWING WAVING LEAF---//
    var animateFeet2 = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);

        var dt = time - time_prev;
        time_prev = time;

        

        //--MOVEMENT--//

        //-DYNAMIC MOVEMENT-//
        //digeser mouse
        if (!drag) {
            dx *= friction;
            dy *= friction;

            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }
        MODEL_MATRIX = LIBS.get_I4();
        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);


        //-STATIC MOVEMENT-//
        rotation += animationSpeed; //speed muter

        rotationRange = Math.PI / 4; //jarak geleng2

        rotationAngle = Math.sin(rotation) * rotationRange; //sudut geleng2

        // LIBS.rotateY(MODEL_MATRIX, rotationAngle); //buat muter

        //--DRAWING LEAF2--//
        drawObject(LEAF2_VERTEX, LEAF2_COLOR, LEAF2_FACES, LEAF2.faces);

        GL.flush();

        window.requestAnimationFrame(animateFeet2);
    }

    var animateFeetSamping = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);

        var dt = time - time_prev;
        time_prev = time;

        MODEL_MATRIX = LIBS.get_I4();

        //--MOVEMENT--//

        //-DYNAMIC MOVEMENT-//
        //digeser mouse
        if (!drag) {
            dx *= friction;
            dy *= friction;

            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }

        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);


        //-STATIC MOVEMENT-//
        //dada-dada
        rotation += animationSpeed; //speed muter

        rotationRange = Math.PI / 4; //jarak geleng2

        rotationAngle = Math.sin(rotation) * rotationRange; //sudut geleng2

        // LIBS.rotateY(MODEL_MATRIX, rotationAngle); //buat muter

        axis = [12.4, 2.9, -8];

        LIBS.rotateArbitraryAxis(MODEL_MATRIX, rotationAngle, axis);

        //--DRAWING LEAF SAMPING--//
        drawObject(LEAFSAMPING_VERTEX, LEAFSAMPING_COLOR, LEAFSAMPING_FACES, LEAFSAMPING.faces);

        GL.flush();

        window.requestAnimationFrame(animateFeetSamping);
    };

    var animateLeafSamping2 = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);

        var dt = time - time_prev;
        time_prev = time;

        MODEL_MATRIX = LIBS.get_I4();

        //--MOVEMENT--//

        //-DYNAMIC MOVEMENT-//
        //digeser mouse
        if (!drag) {
            dx *= friction;
            dy *= friction;

            theta += (dx * 2 * Math.PI) / CANVAS.width;
            alpha += (dy * 2 * Math.PI) / CANVAS.height;
        }

        LIBS.rotateY(MODEL_MATRIX, theta);
        LIBS.rotateX(MODEL_MATRIX, alpha);
        

        //-STATIC MOVEMENT-//
        //geleng-geleng kepala
        rotation += animationSpeed; //speed muter

        rotationRange = Math.PI / 4; //jarak geleng2

        rotationAngle = Math.sin(rotation) * rotationRange; //sudut geleng2

        // LIBS.rotateY(MODEL_MATRIX, rotationAngle); //buat muter

        drawObject(LEAFSAMPING2_VERTEX, LEAFSAMPING2_COLOR, LEAFSAMPING2_FACES, LEAFSAMPING2.faces);

        GL.flush();

        window.requestAnimationFrame(animateLeafSamping2);
    };
    

    animateBody(0);
    animateAntenna(0);
    animateRock(0);

    animateAlas(0);
    animateFace(0);
    animateUpper(0);

    animateHead(0);
    animateBodySunflower(0);
    animateFeet(0);
    animateFeet2(0);
    animateFeetSamping(0);
    animateLeafSamping2(0);
};
window.addEventListener("load", main);