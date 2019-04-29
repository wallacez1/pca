module.exports = {
    AddPost(req,res){
        const img = req.file
        console.log('string' + req.body.teste);
        console.log(img);
    }
}