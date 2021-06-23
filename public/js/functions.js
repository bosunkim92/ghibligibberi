function toggle() {
    let editForm = document.getElementById("edit-form");
    if(editForm.style.display === 'none') {
        editForm.style.display = 'block';
    } else { 
        editForm.style.display = 'none';
    }
}