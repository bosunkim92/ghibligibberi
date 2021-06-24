function toggle_review() {
    let editForm = document.getElementById("edit-form");
    if(editForm.style.display === 'none') {
        editForm.style.display = 'block';
    } else { 
        editForm.style.display = 'none';
    }
}
function toggle_comment() {
    let editForm = document.getElementById("edit-form-comment");
    if(editForm.style.display === 'none') {
        editForm.style.display = 'block';
    } else { 
        editForm.style.display = 'none';
    }
}