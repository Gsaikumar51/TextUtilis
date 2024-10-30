import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');

  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to Uppercase", "success");
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase", "success");
  };

  const handleClearClick = () => {
    setText('');
    props.showAlert("Text cleared", "success");
  };

  const handleSentenceCaseClick = () => {
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
    );
    props.showAlert("Converted to Sentence Case", "success");
  };

  const handleCapitalizedCaseClick = () => {
    setText(
      text
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase())
    );
    props.showAlert("Converted to Capitalized Case", "success");
  };

  const handleTitleCaseClick = () => {
    setText(
      text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
    props.showAlert("Converted to Title Case", "success");
  };

  const handleDownloadClick = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "textfile.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    props.showAlert("Text file downloaded", "success");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text copied to clipboard!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743'
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to Lowercase</button>
        <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>
        <button className="btn btn-primary mx-2" onClick={handleSentenceCaseClick}>Sentence Case</button>
        <button className="btn btn-primary mx-2" onClick={handleCapitalizedCaseClick}>Capitalized Case</button>
        <button className="btn btn-primary mx-2" onClick={handleTitleCaseClick}>Title Case</button>
        <button className="btn btn-primary mx-2" onClick={handleDownloadClick}>Download Text</button>
        <button className="btn btn-primary mx-2" onClick={handleCopyClick}>Copy to Clipboard</button>
      </div>

      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1>Your Text Summary</h1>
        <p>{wordCount} words and {text.length} characters</p>
        <p>{0.008 * wordCount} minutes read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
