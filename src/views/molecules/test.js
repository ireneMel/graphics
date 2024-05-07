
// var a, b, c, d;
// var uva, uvb, uvc, uvd;
// var sliceCount = stacks + 1;
//
// for (var i = 0; i < stacks; i ++ ) {
//
//     for (var j = 0; j < stacks; j ++ ) {
//
//         a = i * sliceCount + j;
//         b = i * sliceCount + j + 1;
//         c = ( i + 1 ) * sliceCount + j + 1;
//         d = ( i + 1 ) * sliceCount + j;
//
//         uva = new THREE.Vector2( j / stacks, i / stacks );
//         uvb = new THREE.Vector2( ( j + 1 ) / stacks, i / stacks );
//         uvc = new THREE.Vector2( ( j + 1 ) / stacks, ( i + 1 ) / stacks );
//         uvd = new THREE.Vector2( j / stacks, ( i + 1 ) / stacks );
//
//         this_.geometry.faces.push( new THREE.Face3( a, b, d ) );
//         // uvs.push( [ uva, uvb, uvd ] );
//
//         this_.geometry.faces.push( new THREE.Face3( b, c, d ) );
//         // uvs.push( [ uvb.clone(), uvc, uvd.clone() ] );
//
//     }
//
// }
//
// this_.geometry.computeFaceNormals();
// this_.geometry.computeVertexNormals();