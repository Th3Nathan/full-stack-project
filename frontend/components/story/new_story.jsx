import React from 'react';
import { Link } from 'react-router-dom';
import NewAuthorBox from './new_author_box';
import ReactQuill, { Quill } from 'react-quill';

class NewStory extends React.Component {
  constructor(props){
    super(props);
    this.modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        ['link', 'image'],
        ['clean']
      ],
    };

    this.formats = [
      'header',
      'bold', 'italic', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ];
    this.bold = this.bold.bind(this);
    this.italicize = this.italicize.bind(this);
    this.attachment = this.attachment.bind(this);
    this.blockquote = this.blockquote.bind(this);
    this.header1 = this.header1.bind(this);
    this.header2 = this.header2.bind(this);
  }

  bold(e){
    e.preventDefault();
    this.quill.format('bold', true);
  }

  italicize(e){
    e.preventDefault();
    this.quill.format('italic', true);
  }

  attachment(e){
    e.preventDefault();
    let value = prompt("Enter an attachment");
    this.quill.format('link', value);
  }

  blockquote(e){
    e.preventDefault();
    this.quill.format('blockquote', true);
  }

  header1(e){
    e.preventDefault();
    this.quill.format('header', 1);
  }

  header2(e){
    e.preventDefault();
    this.quill.format('header', 2);
  }

  componentDidMount(){

    this.quill = new Quill('#text-editor');
    let Inline = Quill.import('blots/inline');

    class BoldBlot extends Inline { }
    BoldBlot.blotName = 'bold';
    BoldBlot.tagName = 'strong';

    class ItalicBlot extends Inline { }
    ItalicBlot.blotName = 'italic';
    ItalicBlot.tagName = 'em';

    Quill.register(BoldBlot);
    Quill.register(ItalicBlot);

    class LinkBlot extends Inline {
      static create(value) {
        let node = super.create();
        // Sanitize url value if desired
        node.setAttribute('href', value);
        // Okay to set other non-format related attributes
        // These are invisible to Parchment so must be static
        node.setAttribute('target', '_blank');
        return node;
      }

      static formats(node) {
        // We will only be called with a node already
        // determined to be a Link blot, so we do
        // not need to check ourselves
        return node.getAttribute('href');
      }
    }
    LinkBlot.blotName = 'link';
    LinkBlot.tagName = 'a';

    Quill.register(LinkBlot);

    let Block = Quill.import('blots/block');
    class BlockquoteBlot extends Block { }
    BlockquoteBlot.blotName = 'blockquote';
    BlockquoteBlot.tagName = 'blockquote';

    class HeaderBlot extends Block {
      static formats(node) {
        return HeaderBlot.tagName.indexOf(node.tagName) + 1;
      }
    }
    HeaderBlot.blotName = 'header';
    // Medium only supports two header sizes, so we will only demonstrate two,
    // but we could easily just add more tags into this array
    HeaderBlot.tagName = ['H1', 'H2'];

  }



  render(){
    return (
      <section>
      <NewAuthorBox
        currentUser={this.props.currentUser}
      />
      <div id="tooltip-controls">
      <button onClick={this.bold} id="bold-button"><i className="fa fa-bold"></i></button>
      <button onClick={this.italicize} id="italic-button"><i className="fa fa-italic"></i></button>
      <button onClick={this.attachment} id="link-button"><i className="fa fa-link"></i></button>
      <button onClick={this.blockquote} id="blockquote-button"><i className="fa fa-quote-right"></i></button>
      <button onClick={this.header1} id="header-1-button"><i className="fa fa-header"><sub>1</sub></i></button>
      <button onClick={this.header2} id="header-2-button"><i className="fa fa-header"><sub>2</sub></i></button>
      </div>
      <div id="text-editor">
        <ReactQuill
          theme="bubble"
          modules={this.modules}
          formats={this.formats}
        >
        </ReactQuill>
      </div>
      </section>
    );
  }
}

export default NewStory;
