export const randomWord = (length) => {
    var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","."]
    var word = ""
    for(var i = 0; i < length; i++){
        word += alphabet[parseInt(Math.floor(Math.random()*alphabet.length))]
    }
    return word
}