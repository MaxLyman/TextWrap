console.log('TextWrap extension loaded 🫣');

document.addEventListener('keydown', function(event) {
    const punctuationMarks = {
               '\'' : '\'',
               '"' : '"', 
               '(' : ')',                
               '[' : ']', 
               '{' : '}', 
               "\`": "\`",
                '\<': '\>',
                '«': '»',
                '„': '“',
                '“': '”',
                '‘': '’',
                "|": "|",
           };
    if (Object.keys(punctuationMarks).includes(event.key)) {
      event.preventDefault();
      const activeElement = document.activeElement;
      
      // Ensure the active element is a text area or input
      if (activeElement.tagName === 'TEXTAREA' || (activeElement.tagName === 'INPUT' && activeElement.type === 'text')) {
        // Get the selection range
        const selectionStart = activeElement.selectionStart;
        const selectionEnd = activeElement.selectionEnd;
        
        if (selectionStart !== selectionEnd) {
          const selectedText = activeElement.value.substring(selectionStart, selectionEnd);
          const wrappedText = event.key + selectedText + punctuationMarks[event.key];
          activeElement.value = activeElement.value.substring(0, selectionStart) +
                              wrappedText +
                              activeElement.value.substring(selectionEnd);
                              
          // Set the new cursor position
          activeElement.selectionStart = selectionEnd + 2; 
          activeElement.selectionEnd = selectionEnd + 2;
        
        }
      }
    }
  });
  