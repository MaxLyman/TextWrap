console.log('TextWrap extension loaded 🫣');


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

const lazyPunctuationMarks = {
   ')': '(',
   ']': '[',
   '}': '{',
   '>': '<',
   '»': '«',
   '“': '„',
   '”': '“',
 };


document.addEventListener('keydown', function(event) {
    wrapSelectedText(event)
});


function wrapSelectedText(event){
    if (Object.keys(punctuationMarks).includes(event.key) || Object.keys(lazyPunctuationMarks).includes(event.key)) { 
        const activeElement = document.activeElement;
        // Ensure the active element is a text area or input
        if (activeElement && (activeElement.tagName === 'TEXTAREA' || (activeElement.tagName === 'INPUT' && activeElement.type === 'text'))) {
            const selectionStart = activeElement.selectionStart;
            const selectionEnd = activeElement.selectionEnd;
            if (selectionStart !== selectionEnd) {
                event.preventDefault();
                const selectedText = activeElement.value.substring(selectionStart, selectionEnd);
                
                const key = event.key;
                const wrappedText = punctuationMarks[key] 
                      ? key + selectedText + punctuationMarks[key]
                      : lazyPunctuationMarks[key] 
                        ? lazyPunctuationMarks[key] + selectedText + key
                        : selectedText;                
                activeElement.value = activeElement.value.substring(0, selectionStart) +
                                    wrappedText +
                                    activeElement.value.substring(selectionEnd);
                
                // Set the new cursor position
                activeElement.selectionStart = selectionEnd + 2; 
                activeElement.selectionEnd = selectionEnd + 2; 
                
                // Trigger the input event to update the area 
                const new_event = new Event('input', { bubbles: true });
                activeElement.dispatchEvent(new_event);
            }
        }
    }
 }


  