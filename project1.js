// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
/**
* 
*/
function GetTransform( positionX, positionY, rotation, scale )
{
	const rotation_rad = rotation * (Math.PI / 180); //Math.cos/sin take only radiants
	
	const rotation_cosTheta = Math.cos(rotation_rad);
	const rotation_sinTheta = Math.sin(rotation_rad);

	//Build aggregate matrix
	
	return Array(
		//COLUMN-MAJOR FORMAT (IN ORDER OF COLUMNS)
		//1st col
		scale * rotation_cosTheta,
		scale * rotation_sinTheta,  
		0, 
		//2nd col
		scale * -rotation_sinTheta,
		scale * rotation_cosTheta,
		0,
		//3d col
		positionX,
		positionY, 
		1//(hom coords)
	);
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	//v' = trans2 * (trans1 * v)
	//v' = (trans2*trans1) * v
	//v' = ApplyTransform(trans1, trans2) * v

	return Array(
        //FIRST COL
        trans2[0] * trans1[0] + trans2[3] * trans1[1] + trans2[6] * trans1[2], //row1
        trans2[1] * trans1[0] + trans2[4] * trans1[1] + trans2[7] * trans1[2], //row2
        trans2[2] * trans1[0] + trans2[5] * trans1[1] + trans2[8] * trans1[2], //row3
		//SECOND COL
        trans2[0] * trans1[3] + trans2[3] * trans1[4] + trans2[6] * trans1[5], //row1
        trans2[1] * trans1[3] + trans2[4] * trans1[4] + trans2[7] * trans1[5], //row2
        trans2[2] * trans1[3] + trans2[5] * trans1[4] + trans2[8] * trans1[5], //row3
		//THIRD COL
        trans2[0] * trans1[6] + trans2[3] * trans1[7] + trans2[6] * trans1[8], //row1
        trans2[1] * trans1[6] + trans2[4] * trans1[7] + trans2[7] * trans1[8], //row2
        trans2[2] * trans1[6] + trans2[5] * trans1[7] + trans2[8] * trans1[8] //row3
    );
}
