const dummy = () => {


    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const favorite = blogs.find(blog => blog.likes === maxLikes)
    return (
        blogs.length > 0 
        ? {title: favorite.title, author: favorite.author, likes: favorite.likes}
        : {}

    )
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const authorList = blogs.map(blog => blog.author)
    let reapetAuthor = []

    authorList.forEach(item => {
        if (reapetAuthor.every(element => item !== element.author)) {
    
            reapetAuthor = reapetAuthor.concat({author: item, blogs: 1})
        } else {
            const index = reapetAuthor.findIndex(element => element.author === item)
            reapetAuthor[index].blogs += 1
        }
    })

    const maxBlogs = Math.max(...reapetAuthor.map(item => item.blogs))


    return reapetAuthor.find(element => element.blogs === maxBlogs)
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const authorList = blogs.map(blog => {
        return {author: blog.author, likes: blog.likes}
    })
    
    let authorLikes = []

    authorList.forEach(authorObj => {
        if (authorLikes.every(item => item.author !== authorObj.author)){
            authorLikes = authorLikes.concat(authorObj)
        } else {
            const index = authorLikes.findIndex(element => element.author === authorObj.author)
            authorLikes[index].likes += authorObj.likes
        }
    })

    const maxLikes = Math.max(...authorLikes.map(obj => obj.likes))


    return authorLikes.find(element => element.likes === maxLikes)

     return authorList
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

// const blogs = [
//     { 
//         _id: "5a422a851b54a676234d17f7",
//         title: "React patterns",
//         author: "Michael Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//         __v: 0
//     },
//     {
//         _id: "5a422aa71b54a676234d17f8",
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//         likes: 5,
//         __v: 0
//     },
//     { 
//         _id: "5a422b3a1b54a676234d17f9",
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//         likes: 12,
//         __v: 0 
//     },
//     {
//         _id: "5a422b891b54a676234d17fa",
//         title: "First class tests",
//         author: "Robert C. Martin",
//         url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//         likes: 10,
//         __v: 0 
//     },
//     { 
//         _id: "5a422ba71b54a676234d17fb",
//         title: "TDD harms architecture",
//         author: "Robert C. Martin",
//         url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//         likes: 0,
//         __v: 0 
//     },
//     {
//         _id: "5a422bc61b54a676234d17fc",
//         title: "Type wars",
//         author: "Robert C. Martin",
//         url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//         likes: 2,
//         __v: 0
//     }
// ]

// console.log(mostLikes(blogs))