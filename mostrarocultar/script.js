function toggleDivs() {
    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');

    if (div1.style.display === 'none') {
        div1.style.display = 'flex';
        div2.style.display = 'none';
    } else {
        div1.style.display = 'none';
        div2.style.display = 'flex';
    }
}