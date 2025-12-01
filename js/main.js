// Blog posts data
const blogPosts = [
    {
        id: 'getting-started-with-backend',
        title: 'Getting Started with Backend Development',
        date: '2024-01-15',
        excerpt: 'A comprehensive guide to starting your journey in backend development, covering essential concepts and tools.',
        file: 'blog/post.html?post=getting-started-with-backend'
    },
    {
        id: 'api-design-best-practices',
        title: 'API Design Best Practices',
        date: '2024-01-10',
        excerpt: 'Learn about RESTful API design principles, versioning strategies, and common pitfalls to avoid.',
        file: 'blog/post.html?post=api-design-best-practices'
    },
    {
        id: 'database-optimization-tips',
        title: 'Database Optimization Tips',
        date: '2024-01-05',
        excerpt: 'Practical tips for optimizing database queries and improving application performance.',
        file: 'blog/post.html?post=database-optimization-tips'
    }
];

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Function to render blog posts
function renderBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    blogGrid.innerHTML = blogPosts.map(post => `
        <a href="${post.file}" class="blog-card">
            <h3>${post.title}</h3>
            <div class="date">${formatDate(post.date)}</div>
            <p class="excerpt">${post.excerpt}</p>
        </a>
    `).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
});

