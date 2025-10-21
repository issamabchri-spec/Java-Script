
const checkboxes = document.querySelectorAll('.task');

const countSpan = document.getElementById('count');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
 
    const checkedCount = document.querySelectorAll('.task:checked').length;
    
   
    countSpan.textContent = checkedCount;
  });
});
