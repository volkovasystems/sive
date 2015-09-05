/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "sive",
			"fileName": "sive.js",
			"moduleName": "sive",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/sive.git",
			"testCase": "sive-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation

	@include:
		{
			"harden": "harden"
		}
	@end-include
*/

if( !( typeof window != "undefined" &&
	"harden" in window ) )
{
	var harden = require( "harden" );
}

if( typeof window != "undefined" && 
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" ); 
}

var sive = function sive( conditions ){
	/*:
		@meta-configuration:
			{
				"conditions:required": "Array|..."
			}
		@end-meta-configuration
	*/

	if( Array.isArray( conditions ) ){
		return conditions
			.map( function onEachCondition( result ){
				return +result;
			} )
			.reduce( function onEachCondition( total, result ){
				return total + result;
			}, 0 ) > 0;

	}else if( arguments.length > 1 ){
		for( var index = 0; index < arguments.length; index++ ){
			if( !arguments[ index ] ){
				return false;
			}
		}

		return true;
	
	}else{
		throw new Error( "single condition is not supported" );
	}
};

if( typeof module != "undefined" ){ 
	module.exports = sive; 
}

if( typeof global != "undefined" ){
	harden
		.bind( sive )( "globalize", 
			function globalize( ){
				harden.bind( global )( "sive", sive );
			} );
}
