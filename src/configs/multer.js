//Utilizado para realizar upload para o próprio servidor do node.

const multer  = require("multer"); //Relatórios Gerenciais/Processos de Apuração/Apuração Contestação - Federação Minas - RN430
const {v4} = require("uuid"); //Criar nome dinâmico para os arquivos;

//Configuração multer, criando nova instância.
const upload = multer({
	storage: multer.diskStorage({
		destination:"uploads/",
		filename(req, file,  callback) {
			const filename = `${v4()} - ${file.originalname}`;

			return callback(null, filename);
		}
	})
});

module.exports = {upload};