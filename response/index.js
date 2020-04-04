module.exports= {
	err(msg){
		return ({"status": "300","message": msg});
	},
	success(data, msg){
		return ({"status": "200", "message": msg, "data": data});
	}
}