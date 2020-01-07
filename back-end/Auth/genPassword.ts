// export default 
export default function randomPassword() {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    var passLength = Math.floor((Math.random()* (Math.floor(20)- Math.ceil(5))+ Math.ceil(5)));    
    for (var x = 0; x < passLength; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
} 
