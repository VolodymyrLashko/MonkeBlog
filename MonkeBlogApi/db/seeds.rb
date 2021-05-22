# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(username: "admin", password: "admin", age: 13, email: "monke@gmail.com")

category = Category.create(name: "some category")

tag = Tag.create(name: "some tag")

post_tag = PostTag.create(post_id: 1, tag_id: 1)

post = Post.create(title: "some post", category_id: category.id, user_id: user.id, text: "some text")

comment = Comment.create(text: "some teeext", post_id: 1, user_id: 1)
