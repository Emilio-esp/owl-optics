export function decodeValue( val ){
    if (typeof val === "string") {
        try {
            return JSON.parse(val);
        } catch ( err ) {
            console.log("(decodeValue) not_parse_value");
        }
    }
}

export function encodeValue ( val ){
    if (typeof val === "string") return val;
    
    try {
      return JSON.stringify(val);
    } catch (err) {
      console.log("(encodeValue) not_encode_value");
    }
}