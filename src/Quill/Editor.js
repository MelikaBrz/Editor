import React from 'react'
import hljs from 'highlight.js';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-quill/dist/quill.snow.css';
// import  quillTable  from 'quill-table';
import * as QuillTableUI from 'quill-table-ui';
import ImageResize from 'quill-image-resize-module-react';
import { ImageDrop } from "quill-image-drop-module";
import MagicUrl from 'quill-magic-url'
import BlotFormatter from 'quill-blot-formatter';
import './styles.css';
import ReactQuill, { Quill } from 'react-quill';
import katex from 'katex';
import "katex/dist/katex.min.css";
import "quill-emoji/dist/quill-emoji.css";
// ReactQuill.Quill.register('modules/table',quillTable)
import * as Emoji from "quill-emoji";
Quill.register("modules/emoji", Emoji);

Quill.register({
    'modules/tableUI': QuillTableUI
}, true);
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register({
    "modules/imageDrop": ImageDrop,
    "modules/magicUrl": MagicUrl
});
Quill.register('modules/imageResize', ImageResize);
// Quill.register("modules/imageDrop", ImageDrop);
window.Quill = Quill;
window.katex = katex;




hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust'],
})

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.reactQuillRef = React.createRef();

    }

    handleChange(value) {
        console.log(this.reactQuillRef)
        const editor = this.reactQuillRef.current.getEditor();
        const tableModule = editor.getModule('table')
        tableModule.insertTable(3, 3);

        this.setState({ text: value })

    }

    render() {
        return (
            <ReactQuill
                value={this.state.text}
                ref={this.reactQuillRef}
                onChange={this.handleChange}
                theme="snow"
                modules={Editor.modules}
                formats={Editor.modules}
                placeholder={"write here..."}
            />
        )
    }
}

Editor.modules = {
    // table:true,
    // tableUI:true,
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    "emoji-toolbar": true,
    // "emoji-textarea": true,
    "emoji-shortname": true,
    toolbar: [

        [{ font: [] }, { size: [] }], [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'], [{ color: ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],

        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { 'direction': 'rtl' },
            { 'direction': 'ltr' }
        ],
        ['link', 'image', 'video', 'emoji'],
        // [{ table: [4] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],

        ['clean', 'formula'],
    ],
    clipboard: {
        matchVisual: false,
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    },

    // imageDrop:{
    //     module:['']
    // }
    imageDrop: true
    , magicUrl: true,
    blotFormatter: {}
}
Editor.formats = [
    'header',
    'font',
    'size',
    'emoji',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'direction',
    'blockquote',
    'code-block',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
];

export default Editor;