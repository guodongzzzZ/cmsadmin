function messageBox(obj,type,msg) {
    obj.$message({
        type: type,
        message: msg 
    });
}

export default{  messageBox}