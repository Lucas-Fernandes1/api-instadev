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

	async updatePost(req, res) {
		
		const {id} = req.params;

		const verifyPost = await Posts.findOne({
			where: {
				id,
			}
		});

		if (!verifyPost) {
			return res.status(404).json({message: "Post does not exists!"}); //404 BAD REQUEST
		}

		if (req.userId != verifyPost.author_id) {
			return res.status(401).json({message: "You don't have permisson to alter this post!"}); //401 UNAUTHORIZED
		}

		const postUpdate = await Posts.update(req.body, {where:{id}});

		if (!postUpdate) {
			return res.status(400).json({message: "Failed to updated this post!"}); //400 BAD REQUEST
		}

		return res.status(200).json({message: "Post updated!"});
	}

	async addLike(req, res) {
		
		const {id} = req.params;

		const verifyPost = await Posts.findOne({
			where: {
				id,
			}
		});

		if (!verifyPost) {
			return res.status(404).json({message: "Post does not exists!"}); //404 BAD REQUEST
		}

		if (req.userId != verifyPost.author_id) {
			return res.status(401).json({message: "You don't have permisson to alter this post!"}); //401 UNAUTHORIZED
		}

		const postUpdate = await Posts.update({
			number_likes: verifyPost.number_likes + 1
		}, 
		{
			where: {id}
		});

		if (!postUpdate) {
			return res.status(400).json({message: "Failed to add like in this post!"}); //400 BAD REQUEST
		}

		return res.status(200).json({
			message: "Like storaged!",
		});

	}

	async listMyPosts(req, res) {
		const allPosts = await Posts.findAll({
			where: {
				author_id: req.userId
			}, 
			attributes: ["id", "image", "description", "number_likes"],
		});

		console.log(allPosts);

		if (!allPosts) {
			return res.status(400).json({message: "Faild to list all posts!"});
		}

		return res.status(200).json({data: allPosts})

	}

}

module.exports = new PostController();