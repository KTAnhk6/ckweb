// Load components
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.log('Error loading component:', error));
}

// Load all components when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('hero', 'components/hero.html');
    loadComponent('categories', 'components/categories.html');
    loadComponent('products', 'components/products.html');
    loadComponent('features', 'components/features.html');
    loadComponent('newsletter', 'components/newsletter.html');
    loadComponent('footer', 'components/footer.html');
});