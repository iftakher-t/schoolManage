

const singleUplodeController = async (req,res) =>{
    console.log(req.file);
    res.send('image upload successfully')

}

const multipleUplodeController = async (req,res) =>{
    console.log(req.files);
    res.send('images upload successfully')

}

module.exports = {
    singleUplodeController,
    multipleUplodeController
}
