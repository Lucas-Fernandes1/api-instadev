const fsp = require("fs/promises");
const B2 = require("backblaze-b2");

const {
	APPLICATIONKEYID, 
	APPLICATIONKEY, 
	BUCKETID,
	BASE_URL_BLACKBAZE
} = process.env

const b2 = new B2({
	applicationKeyId: APPLICATIONKEYID,
	applicationKey: APPLICATIONKEY
});

const unlinkAsync = fsp.unlink;

class FileController {
	async upload(req, res) {
	
		const filename = req.file.filename;
		const path = req.file.path;

		try {
			
			const file = await fsp.readFile(`uploads/${filename}`, (err, data) => {
				
				if (err) {
					throw(err)
				}
				
				return data;
			});

			await b2.authorize();

			const { data: {uploadUrl, authorizationToken} } = await b2.getUploadUrl({
				bucketId: BUCKETID
			});

			
			const {data} = await b2.uploadFile({
				uploadUrl: uploadUrl,
				uploadAuthToken: authorizationToken,
				fileName: filename,
				data: file
			});
			
			await unlinkAsync(path);

			return res.send({url: `${BASE_URL_BLACKBAZE}${data.fileName}`});

		} catch (error) {
			console.log(error.message)
			return res.status(400).send({message: "Failed to upload!"});
		}

	}
}

module.exports = new FileController();