const Posts = require("../models/Posts");
class PostController {

	async createPost(req, res) {
		const {image, description} = req.body;
        
		const newPost = await Posts.create({
			image, 
			description, 
			author_id: req.userId
		});

		if (!newPost) {
			return res.status(401).json({message: "Created post failed"});
		}

		return res.status(200).json({date: {image, description}});
	}

	async deletePost(req, res) {
		
		const {id} = req.params;
        
		const verifyPost = await Posts.findOne({
			where: {
				id: id,
				author_id: req.userId
			}
		});

		if (!verifyPost) {
			return res.status(404).json({message: "Post does not exists"});   
		}

		if (verifyPost.author_id != req.userId) {

			return res.status(401).json(
				{
					message: "You don't have permission to delete this post."
				}
			);
		}

		const deletedPost = await Posts.destroy({
			where: {
				id
			}
		});

		if (!deletedPost)  {
			return res.status(400).json({message: "Failed to delete this post."});
		}

		return res.status(200).json({message: "Post deleted."});

	}

}

module.exports = new PostController();