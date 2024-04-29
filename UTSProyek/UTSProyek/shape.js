function generateTorus(x, y, z, r, g, b, radius1, radius2, segments1, segments2, rotationX, rotationY, rotationZ) {
  var vertices = [];
  var colors = [];

  for (var i = 0; i <= segments1; i++) {
      var u = (2 * Math.PI * i) / segments1;

      for (var j = 0; j <= segments2; j++) {
          var v = (2 * Math.PI * j) / segments2;

          // Calculate vertex position relative to torus's center
          var torusCenterX = x + ((radius1 + radius2 * Math.cos(v)) * Math.cos(u));
          var torusCenterY = y + ((radius1 + radius2 * Math.cos(v)) * Math.sin(u));
          var torusCenterZ = z + (radius2 * Math.sin(v));

          // Apply rotations relative to the torus's center
          var rotatedX = torusCenterX - x;
          var rotatedY = torusCenterY - y;
          var rotatedZ = torusCenterZ - z;

          // Rotate around X axis
          var tempY = rotatedY;
          rotatedY = tempY * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
          rotatedZ = tempY * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);

          // Rotate around Y axis
          var tempX = rotatedX;
          rotatedX = tempX * Math.cos(rotationY) - rotatedZ * Math.sin(rotationY);
          rotatedZ = -tempX * Math.sin(rotationY) + rotatedZ * Math.cos(rotationY);

          // Rotate around Z axis
          var tempX2 = rotatedX;
          rotatedX = tempX2 * Math.cos(rotationZ) - rotatedY * Math.sin(rotationZ);
          rotatedY = tempX2 * Math.sin(rotationZ) + rotatedY * Math.cos(rotationZ);

          // Translate the vertex back to its original position relative to the torus's center
          rotatedX += x;
          rotatedY += y;
          rotatedZ += z;

          vertices.push(rotatedX, rotatedY, rotatedZ);
          colors.push(r,g,b);
      }
  }

  var faces = [];
  for (var i = 0; i < segments1; i++) {
      for (var j = 0; j < segments2; j++) {
          var index = i * (segments2 + 1) + j;
          var nextIndex = index + segments2 + 1;
          faces.push(index, nextIndex, index + 1);
          faces.push(nextIndex, nextIndex + 1, index + 1);
      }
  }
  return { vertices: vertices, colors: colors, faces: faces };
}

function generateCurvedTriangle(x, y, z, r, g, b, radius1, radius2, segments1, segments2) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0; i <= segments1; i++) {
        var u = (2 * Math.PI * i) / segments1;
  
        for (var j = 0; j <= segments2; j++) {
            var v = (2 * Math.PI * j) / segments2;
            var xCoord = x + ((radius1 + radius2 * Math.cos(u)) * Math.cos(v));
            var yCoord = y + ((radius1 + radius2 * Math.sin(u)) * Math.sin(u));
            var zCoord = z + (radius2 * Math.sin(v));
            vertices.push(xCoord, yCoord, zCoord);
            colors.push(r,g,b);
        }
    }
  
    var faces = [];
    for (var i = 0; i < segments1; i++) {
        for (var j = 0; j < segments2; j++) {
            var index = i * (segments2 + 1) + j;
            var nextIndex = index + segments2 + 1;
            faces.push(index, nextIndex, index + 1);
            faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
}

function generateSphere(x, y, z, r, g, b, radius, segments) {
    var vertices = [];
    var colors = [];
    var ball_color = [[r,g,b]];
  
    for (var i = 0; i <= segments; i++) {
        var latAngle = 2* Math.PI * (i / segments);
        var sinLat = Math.sin(latAngle);
        var cosLat = Math.cos(latAngle);
  
        for (var j = 0; j <= segments; j++) {
            var lonAngle = 2 * Math.PI * (j / segments);
            var sinLon = Math.sin(lonAngle);
            var cosLon = Math.cos(lonAngle);
  
            var xCoord = cosLon * cosLat;
            var yCoord = sinLon * cosLat;
            var zCoord = sinLat;
  
            var vertexX = x + radius * xCoord;
            var vertexY = y + radius * yCoord;
            var vertexZ = z + radius * zCoord;
            vertices.push(vertexX, vertexY, vertexZ -0.5);

            var colorIndex = j % ball_color.length;
            colors = colors.concat(ball_color[colorIndex]);
        }
    }
  
    var ball_faces = [];
    for (var i = 0; i < segments; i++) {
        for (var j = 0; j < segments; j++) {
            var index = i * (segments + 1) + j;
            var nextIndex = index + segments + 1;
            ball_faces.push(index, nextIndex, index + 1);
            ball_faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
    return { vertices: vertices, colors: colors, faces: ball_faces };
  }

function generateHalfSphere(x, y, z, r, g, b, radius, segments) {
  var vertices = [];
  var colors = [];
  var ball_color = [[r,g,b]];

  for (var i = 0; i <= segments; i++) {
      var latAngle = Math.PI * (-0.5 + (i / segments));
      var sinLat = Math.sin(latAngle);
      var cosLat = Math.cos(latAngle);

      for (var j = 0; j <= segments/2; j++) {
          var lonAngle = 2 * Math.PI * (j / segments);
          var sinLon = Math.sin(lonAngle);
          var cosLon = Math.cos(lonAngle);

          var xCoord = cosLon * cosLat;
          var yCoord = sinLon * cosLat;
          var zCoord = sinLat;

          var vertexX = x + radius * xCoord;
          var vertexY = y + radius * yCoord;
          var vertexZ = z + radius * zCoord;
          vertices.push(vertexX, vertexY, vertexZ -0.5);
          
          var colorIndex = j % ball_color.length;
          colors = colors.concat(ball_color[colorIndex]);
      }
  }

  var ball_faces = [];
  for (var i = 0; i < segments/2; i++) {
      for (var j = 0; j < segments; j++) {
          var index = i * (segments + 1) + j;
          var nextIndex = index + segments + 1;
          ball_faces.push(index, nextIndex, index + 1);
          ball_faces.push(nextIndex, nextIndex + 1, index + 1);
      }
  }
  return { vertices: vertices, colors: colors, faces: ball_faces };
}
  
function generateTube(x, y, z, r, g, b, height, bottomRadius, topRadius, segments) {
  var angle_increment = (2 * Math.PI) / segments;
  var vertices = [];
  var colors = [];
  var faces = [];

  for (var i = 0; i < segments; i++) {
      var angle1 = i * angle_increment;
      var angle2 = (i + 1) * angle_increment;

      // Bottom vertices
      vertices.push(x + bottomRadius * Math.cos(angle1), y, z + bottomRadius * Math.sin(angle1));
      vertices.push(x + bottomRadius * Math.cos(angle2), y, z + bottomRadius * Math.sin(angle2));

      // Top vertices
      vertices.push(x + topRadius * Math.cos(angle1), y + height, z + topRadius * Math.sin(angle1));
      vertices.push(x + topRadius * Math.cos(angle2), y + height, z + topRadius * Math.sin(angle2));

      // Colors for all vertices
      colors.push(r,g,b);
      colors.push(r,g,b);
      colors.push(r,g,b);
      colors.push(r,g,b);

      // Faces for this segment
      var baseIndex = i * 4;
      faces.push(baseIndex, baseIndex + 1, baseIndex + 2); // Triangle 1
      faces.push(baseIndex + 1, baseIndex + 3, baseIndex + 2); // Triangle 2
  }

  // Closing faces for top and bottom circles
  for (var i = 0; i < segments - 1; i++) {
      // Bottom circle
      faces.push(i * 4, (i + 1) * 4, vertices.length / 3 - 2);
      // Top circle
      faces.push(i * 4 + 2, (i + 1) * 4 + 2, vertices.length / 3 - 1);
  }

  // Close the last segment with the first one
  faces.push((segments - 1) * 4, 0, vertices.length / 3 - 2);
  faces.push((segments - 1) * 4 + 2, 2, vertices.length / 3 - 1);

  return { vertices: vertices, colors: colors, faces: faces };
}

function generateEllipsoid(x, y, z, a, b, c, r, g, bl, segments) {
  var vertices = [];
  var colors = [];

  for (var i = 0; i <= segments; i++) {
    var u = -Math.PI + (2 * Math.PI * i) / segments;

    for (var j = 0; j <= segments; j++) {
      var v = -Math.PI + (2 * Math.PI * j) / segments;

      var xCoord = x + (a * Math.cos(v) * Math.cos(u));
      var yCoord = y + (b * Math.cos(v) * Math.sin(u));
      var zCoord = z + (c * Math.sin(v));

      vertices.push(xCoord, yCoord, zCoord);
      colors.push(r,g,bl);
    }
  }

  var faces = [];
  for (var i = 0; i < segments; i++) {
    for (var j = 0; j < segments; j++) {
      var index = i * (segments + 1) + j;
      var nextIndex = index + segments + 1;

      faces.push(index, nextIndex, index + 1);
      faces.push(nextIndex, nextIndex + 1, index + 1);
    }
  }

  return { vertices: vertices, colors: colors, faces: faces };
}

function generateHyperboloid(x, y, z, a, b, c, r, g, bl, segments) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0; i <= segments; i++) {
      var u = -Math.PI + (2 * Math.PI * i) / segments;
  
      for (var j = 0; j <= segments; j++) {
        var v = -Math.PI / 3 + ((Math.PI / 1.5) * j) / segments;
  
        var xCoord = x + (a / Math.cos(v)) * Math.cos(u);
        var yCoord = y + (b / Math.cos(v)) * Math.sin(u);
        var zCoord = z + (c * Math.tan(v));

        vertices.push(xCoord, yCoord, zCoord)
        colors.push(r,g,bl);
      }
    }
  
    var faces = [];
    for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
        var index = i * (segments + 1) + j;
        var nextIndex = index + segments + 1;
        faces.push(index, nextIndex, index + 1);
        faces.push(nextIndex, nextIndex + 1, index + 1);
      }
    }
    return { vertices: vertices, colors: colors, faces: faces };
  }

function generateEllipticParaboloid(x, y, z, a, b, r, g, bl, segments) {
    var vertices = [];
    var colors = [];

    for (var i = 0; i <= segments; i++) {
      var u = -Math.PI + (2 * Math.PI * i) / segments;

      for (var j = 0; j <= segments; j++) {
        var v = (j) / segments;
        var xCoord = x + (a * v * Math.cos(u));
        var yCoord = y + (b * v * Math.sin(u));
        var zCoord = z + (Math.pow(v, 2));

        vertices.push(xCoord, yCoord, zCoord);
        colors.push(r, g, bl);
      }
    }

    var faces = [];
    for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
        var index = i * (segments + 1) + j;
        var nextIndex = index + segments + 1;
        faces.push(index, nextIndex, index + 1);
        faces.push(nextIndex, nextIndex + 1, index + 1);
      }
    }

    // Fungsi rotasi sumbu y
    function rotateY(vertices, angle) {
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var newVertices = [];

      for (var i = 0; i < vertices.length; i += 3) {
        var x = vertices[i];
        var z = vertices[i + 2];

        newVertices.push(
          cos * x + sin * z,
          vertices[i + 1],
          -sin * x + cos * z
        );
      }
      return newVertices;
    }

    // Fungsi rotasi sumbu x
    function rotateX(vertices, angle) {
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var newVertices = [];

      for (var i = 0; i < vertices.length; i += 3) {
        var y = vertices[i + 1];
        var z = vertices[i + 2];

        newVertices.push(
          vertices[i],
          cos * y - sin * z,
          sin * y + cos * z
        );
      }
      return newVertices;
    }

    // Memanggil fungsi rotasi sumbu y dan x sebelum mengembalikan vertices
    return { vertices: vertices, colors: colors, faces: faces };
}

function generateEllipticParaboloidN(x, y, z, a, b, r, g, bl, segments) {
  var vertices = [];
  var colors = [];

  for (var i = 0; i <= segments; i++) {
    var u = -Math.PI + (2 * Math.PI * i) / segments;

    for (var j = 0; j <= segments; j++) {
      var v = (j) / segments;
      var xCoord = x + (a * v * Math.cos(u));
      var yCoord = y + (b * v * Math.sin(u));
      var zCoord = z + (Math.pow(v, 2));

      vertices.push(xCoord, yCoord, zCoord);
      colors.push(r, g, bl);
    }
  }

  var faces = [];
  for (var i = 0; i < segments; i++) {
    for (var j = 0; j < segments; j++) {
      var index = i * (segments + 1) + j;
      var nextIndex = index + segments + 1;
      faces.push(index, nextIndex, index + 1);
      faces.push(nextIndex, nextIndex + 1, index + 1);
    }
  }

  // Fungsi rotasi sumbu y
  function rotateY(vertices, angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    var newVertices = [];

    for (var i = 0; i < vertices.length; i += 3) {
      var x = vertices[i];
      var z = vertices[i + 2];

      newVertices.push(
        cos * x + sin * z,
        vertices[i + 1],
        -sin * x + cos * z
      );
    }
    return newVertices;
  }

  // Fungsi rotasi sumbu x
  function rotateX(vertices, angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    var newVertices = [];

    for (var i = 0; i < vertices.length; i += 3) {
      var y = vertices[i + 1];
      var z = vertices[i + 2];

      newVertices.push(
        vertices[i],
        cos * y - sin * z,
        sin * y + cos * z
      );
    }
    return newVertices;
  }

  // Memanggil fungsi rotasi sumbu y dan x sebelum mengembalikan vertices
  return { vertices: rotateY(vertices,Math.PI), colors: colors, faces: faces };
}

function drawBezierCurve(GL, shaderProgram, points, segments) {
  var vertices = [];
  
  // Calculate Bezier curve points
  for (var i = 0; i <= segments; i++) {
      var t = i / segments;
      var point = calculateBezierPoint(points, t);
      vertices.push(point[0], point[1]-0.5, point[2]);
  }
  
  // Create buffer for the curve vertices
  var curveBuffer = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, curveBuffer);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
  
  // Specify vertex attributes
  var positionAttribLocation = GL.getAttribLocation(shaderProgram, "position");
  GL.vertexAttribPointer(positionAttribLocation, 3, GL.FLOAT, false, 0, 0);
  GL.enableVertexAttribArray(positionAttribLocation);
  
  // Draw the curve
  GL.drawArrays(GL.LINE_STRIP, 0, vertices.length / 3);
  
  // Clean up
  GL.deleteBuffer(curveBuffer);
}

function calculateBezierPoint(points, t) {
  var n = points.length - 1;
  var result = [0, 0, 0];
  for (var i = 0; i <= n; i++) {
      var coefficient = binomialCoefficient(n, i) * Math.pow((1 - t), n - i) * Math.pow(t, i);
      result[0] += coefficient * points[i][0];
      result[1] += coefficient * points[i][1];
      result[2] += coefficient * points[i][2];
  }
  return result;
}

function binomialCoefficient(n, k) {
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  var numerator = 1;
  var denominator = 1;
  for (var i = 1; i <= k; i++) {
      numerator *= (n - i + 1);
      denominator *= i;
  }
  return numerator / denominator;
}

function generateCube(x, y, z, c1, c2, c3, size, rotationX, rotationY, rotationZ) {
  var halfSize = size / 2;
  var vertices = [
      // Front face
      x - halfSize, y - halfSize, z + halfSize, // 0
      x + halfSize, y - halfSize, z + halfSize, // 1
      x + halfSize, y + halfSize, z + halfSize, // 2
      x - halfSize, y + halfSize, z + halfSize, // 3
      // Back face
      x - halfSize, y - halfSize, z - halfSize, // 4
      x + halfSize, y - halfSize, z - halfSize, // 5
      x + halfSize, y + halfSize, z - halfSize, // 6
      x - halfSize, y + halfSize, z - halfSize  // 7
  ];
  
  // Apply rotations
  for (var i = 0; i < vertices.length; i += 3) {
      var rotated = rotatePoint(vertices[i], vertices[i + 1], vertices[i + 2], rotationX, rotationY, rotationZ, x, y, z);
      vertices[i] = rotated[0];
      vertices[i + 1] = rotated[1];
      vertices[i + 2] = rotated[2];
  }

  var colors = [
      c1, c2, c3, // Front face
      c1, c2, c3, // Front face
      c1, c2, c3, // Front face
      c1, c2, c3, // Front face
      c1, c2, c3, // Back face
      c1, c2, c3, // Back face
      c1, c2, c3, // Back face
      c1, c2, c3  // Back face
  ];

  var faces = [
      0, 1, 2, 0, 2, 3,    // Front face
      4, 6, 5, 4, 7, 6,    // Back face
      4, 5, 1, 4, 1, 0,    // Left face
      3, 2, 6, 3, 6, 7,    // Right face
      1, 5, 6, 1, 6, 2,    // Top face
      4, 0, 3, 4, 3, 7     // Bottom face
  ];

  return { vertices: vertices, colors: colors, faces: faces };
}

function rotatePoint(x, y, z, rx, ry, rz, cx, cy, cz) {
  var cosrx = Math.cos(rx);
  var sinrx = Math.sin(rx);
  var cosry = Math.cos(ry);
  var sinry = Math.sin(ry);
  var cosrz = Math.cos(rz);
  var sinrz = Math.sin(rz);

  var translatedX = x - cx;
  var translatedY = y - cy;
  var translatedZ = z - cz;

  // Rotate around X axis
  var tempY = translatedY;
  translatedY = tempY * cosrx - translatedZ * sinrx;
  translatedZ = tempY * sinrx + translatedZ * cosrx;

  // Rotate around Y axis
  var tempX = translatedX;
  translatedX = tempX * cosry - translatedZ * sinry;
  translatedZ = -tempX * sinry + translatedZ * cosry;

  // Rotate around Z axis
  var tempX2 = translatedX;
  translatedX = tempX2 * cosrz - translatedY * sinrz;
  translatedY = tempX2 * sinrz + translatedY * cosrz;

  // Translate the point back to its original position
  translatedX += cx;
  translatedY += cy;
  translatedZ += cz;

  return [translatedX, translatedY, translatedZ];
}

function generateTubeM(x, y, z, r, g, b, length, bottomRadius, topRadius, segments) {
  var angle_increment = (2 * Math.PI) / segments;
  var vertices = [];
  var colors = [];
  var faces = [];

  for (var i = 0; i < segments; i++) {
      var angle1 = i * angle_increment;
      var angle2 = (i + 1) * angle_increment;

      // Bottom vertices
      vertices.push(x, y + bottomRadius * Math.cos(angle1), z + bottomRadius * Math.sin(angle1));
      vertices.push(x, y + bottomRadius * Math.cos(angle2), z + bottomRadius * Math.sin(angle2));

      // Top vertices
      vertices.push(x + length, y + topRadius * Math.cos(angle1), z + topRadius * Math.sin(angle1));
      vertices.push(x + length, y + topRadius * Math.cos(angle2), z + topRadius * Math.sin(angle2));

      // Colors for all vertices
      colors.push(r,g,b);
      colors.push(r,g,b);
      colors.push(r,g,b);
      colors.push(r,g,b);

      // Faces for this segment
      var baseIndex = i * 4;
      faces.push(baseIndex, baseIndex + 1, baseIndex + 2); // Triangle 1
      faces.push(baseIndex + 1, baseIndex + 3, baseIndex + 2); // Triangle 2
  }

  // Closing faces for top and bottom circles
  for (var i = 0; i < segments - 1; i++) {
      // Bottom circle
      faces.push(i * 4, (i + 1) * 4, vertices.length / 3 - 2);
      // Top circle
      faces.push(i * 4 + 2, (i + 1) * 4 + 2, vertices.length / 3 - 1);
  }

  // Close the last segment with the first one
  faces.push((segments - 1) * 4, 0, vertices.length / 3 - 2);
  faces.push((segments - 1) * 4 + 2, 2, vertices.length / 3 - 1);

  return { vertices: vertices, colors: colors, faces: faces };
}

function generateEllipticParaboloid2(x, y, z, a, b, r, g, bl, segments) {
  var vertices = [];
  var colors = [];

  for (var i = 0; i <= segments; i++) {
      var u = -Math.PI + (2 * Math.PI * i) / segments;

      for (var j = 0; j <= segments; j++) {
          var v = (j) / segments;
          var xCoord = x + (a * v * Math.cos(u));
          var yCoord = y + (b * v * Math.sin(u));
          var zCoord = z + (Math.pow(v, 2));

          vertices.push(xCoord, yCoord, zCoord);
          colors.push(r, g, bl);
      }
  }

  var faces = [];
  for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
          var index = i * (segments + 1) + j;
          var nextIndex = index + segments + 1;
          faces.push(index, nextIndex, index + 1);
          faces.push(nextIndex, nextIndex + 1, index + 1);
      }
  }

  // Fungsi rotasi sumbu y
  function rotateY(vertices, angle) {
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var newVertices = [];

      for (var i = 0; i < vertices.length; i += 3) {
          var x = vertices[i];
          var z = vertices[i + 2];

          newVertices.push(
              cos * x + sin * z,
              vertices[i + 1],
              -sin * x + cos * z
          );
      }
      return newVertices;
  }

  // Fungsi rotasi sumbu x
  function rotateX(vertices, angle) {
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var newVertices = [];

      for (var i = 0; i < vertices.length; i += 3) {
          var y = vertices[i + 1];
          var z = vertices[i + 2];

          newVertices.push(
              vertices[i],
              cos * y - sin * z,
              sin * y + cos * z
          );
      }
      return newVertices;
  }

  // Memanggil fungsi rotasi sumbu y dan x sebelum mengembalikan vertices
  return { vertices: rotateX(vertices, Math.PI), colors: colors, faces: faces };
}