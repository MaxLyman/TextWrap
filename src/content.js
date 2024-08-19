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
    wrapSelectedText(event);
});

function wrapSelectedText(event) {
    if (Object.keys(punctuationMarks).includes(event.key) || Object.keys(lazyPunctuationMarks).includes(event.key)) { 
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'TEXTAREA' || 
            (activeElement.tagName === 'INPUT' && activeElement.type === 'text') ||
            activeElement.isContentEditable)) {
            
            if (activeElement.isContentEditable) {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    if (!range.collapsed) {
                        event.preventDefault();
                        const selectedText = range.toString();
                        
                        const key = event.key;
                        const wrappedText = punctuationMarks[key] 
                              ? key + selectedText + punctuationMarks[key]
                              : lazyPunctuationMarks[key] 
                                ? lazyPunctuationMarks[key] + selectedText + key
                                : selectedText;
                        
                        range.deleteContents();
                        range.insertNode(document.createTextNode(wrappedText));
                        
                        range.setStart(range.endContainer, range.endOffset);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        
                        const new_event = new Event('input', { bubbles: true });
                        activeElement.dispatchEvent(new_event);
                    }
                }
            } else {
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
                    
                    activeElement.selectionStart = selectionEnd + 2; 
                    activeElement.selectionEnd = selectionEnd + 2; 
                    
                    const new_event = new Event('input', { bubbles: true });
                    activeElement.dispatchEvent(new_event);
                }
            }
        }
    }
}