var LIBS = {
  get_json: function(url, func) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        func(JSON.parse(xmlHttp.responseText));
      }
    };
    xmlHttp.send();
  },

  degToRad: function(angle){
    return(angle*Math.PI/180);
  },

  multiply: function (m1, m2) {
    var res = this.get_I4();
    var N = 4;

    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++) {
        res[i * N + j] = 0;
        for (var k = 0; k < N; k++) {
          res[i * N + j] += m1[i * N + k] * m2[k * N + j];
        }
      }
    }

    return res;
  },

  get_projection: function(angle, a, zMin, zMax) {
    var tan=Math.tan(LIBS.degToRad(0.5*angle)),
        A=-(zMax+zMin)/(zMax-zMin),
          B=(-2*zMax*zMin)/(zMax-zMin);

    return [
      0.5/tan, 0 ,   0, 0,
      0, 0.5*a/tan,  0, 0,
      0, 0,         A, -1,
      0, 0,         B, 0
    ];
  },

  get_I4: function() {
    return [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1];
  },

  set_I4: function(m) {
    m[0]=1, m[1]=0, m[2]=0, m[3]=0,
      m[4]=0, m[5]=1, m[6]=0, m[7]=0,
      m[8]=0, m[9]=0, m[10]=1, m[11]=0,
      m[12]=0, m[13]=0, m[14]=0, m[15]=1;
  },

  rotateX: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv1=m[1], mv5=m[5], mv9=m[9];
    m[1]=m[1]*c-m[2]*s;
    m[5]=m[5]*c-m[6]*s;
    m[9]=m[9]*c-m[10]*s;

    m[2]=m[2]*c+mv1*s;
    m[6]=m[6]*c+mv5*s;
    m[10]=m[10]*c+mv9*s;
  },

  rotateY: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]+s*m[2];
    m[4]=c*m[4]+s*m[6];
    m[8]=c*m[8]+s*m[10];

    m[2]=c*m[2]-s*mv0;
    m[6]=c*m[6]-s*mv4;
    m[10]=c*m[10]-s*mv8;
  },

  rotateZ: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]-s*m[1];
    m[4]=c*m[4]-s*m[5];
    m[8]=c*m[8]-s*m[9];

    m[1]=c*m[1]+s*mv0;
    m[5]=c*m[5]+s*mv4;
    m[9]=c*m[9]+s*mv8;
  },

  translateZ: function(m, t){
    m[14]+=t;
  },

  translateX: function(m,t){
    m[12]+=t;
  },

  translateY: function(m, t){
    m[13]+=t;
  },

  scale: function (m, t) {
    m[0] *= t;
    m[1] *= t;
    m[2] *= t;
    m[3] *= t;
    m[4] *= t;
    m[5] *= t;
    m[6] *= t;
    m[7] *= t;
    m[8] *= t;

    m[9] *= t;
    m[10] *= t;
    m[11] *= t;
  },

  scale2: function (m, sx, sy, sz) {
    m[0] *= sx; m[1] *= sx; m[2] *= sx; m[3] *= sx;
    m[4] *= sy; m[5] *= sy; m[6] *= sy; m[7] *= sy;
    m[8] *= sz; m[9] *= sz; m[10] *= sz; m[11] *= sz;
    m[12] *= 1; m[13] *= 1; m[14] *= 1; m[15] *= 1;
    return m;
  },
  
  create: function () {
    return new Float32Array(16);
  },
  setScale(s) {
    var scale = LIBS.scale(s);
    this.scaling(scale);
  },

  scaling(m4) {
    this.MOVEMATRIX = LIBS.mul(this.MOVEMATRIX, m4);
    this.child.forEach((obj) => {
      obj.scaling(m4);
    });
  },

  rotateArbitraryAxis: function (m, angle, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len = Math.sqrt(x * x + y * y + z * z);
    if (len === 0) {
      return;
    }
    if (len !== 1) {
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
    }
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = 1 - c;
    var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
      a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7],
      a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
    // Construct the rotation matrix
    var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s,
      b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s,
      b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;
    // Perform rotation
    m[0] = a00 * b00 + a10 * b01 + a20 * b02;
    m[1] = a01 * b00 + a11 * b01 + a21 * b02;
    m[2] = a02 * b00 + a12 * b01 + a22 * b02;
    m[3] = a03 * b00 + a13 * b01 + a23 * b02;
    m[4] = a00 * b10 + a10 * b11 + a20 * b12;
    m[5] = a01 * b10 + a11 * b11 + a21 * b12;
    m[6] = a02 * b10 + a12 * b11 + a22 * b12;
    m[7] = a03 * b10 + a13 * b11 + a23 * b12;
    m[8] = a00 * b20 + a10 * b21 + a20 * b22;
    m[9] = a01 * b20 + a11 * b21 + a21 * b22;
    m[10] = a02 * b20 + a12 * b21 + a22 * b22;
    m[11] = a03 * b20 + a13 * b21 + a23 * b22;
  }
};

