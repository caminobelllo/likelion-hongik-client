import React, { useEffect, useRef } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import styled from "styled-components";
import { Column, Row } from "../elements/Wrapper";
import { useRecoilState } from "recoil";
import { isCancelButtonClickedState } from "../../states/index";

type HookCallback = (url: string, text?: string) => void;

export function TextEditor() {
  const editorRef = useRef<Editor>(null);
  const [isCancelButtonClicked, setIsancelButtonClicked] = useRecoilState(isCancelButtonClickedState);

  const onUploadImage = async (blob: Blob | File, callback: HookCallback) => {
    console.log(blob);
    // const url = await uploadImage(blob)
    // callback(url, '첨부 이미지');
    // return false;
  };

  const onClickRegisterButton = () => {
    console.log(editorRef.current?.getInstance().getHTML());
  };

  const onClickCancelButton = () => {
    setIsancelButtonClicked(true);
  };

  // useEffect(() => {
  //   const test = localStorage.getItem("test");
  //   console.dir(test);
  // if (test) {
  //   editorRef.current.getInstance().setMarkdown(test);
  // }
  // }, []);

  return (
    <Column width="80vw" justifyContent="center" alignItems="center" style={{ paddingBottom: "100px" }}>
      <EditorWrapper>
        <Editor
          ref={editorRef}
          placeholder="내용을 입력해주세요."
          previewStyle="vertical" // 미리보기 스타일 지정
          height="500px" // 에디터 창 높이
          // initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
            ["scrollSync"],
          ]}
          autofocus
          theme={"dark"}
          hideModeSwitch={true}
          hooks={
            {
              // addImageBlobHook: onUploadImage,
            }
          }
        />
      </EditorWrapper>
      <Row marginTop="24px" width="100%" justifyContent="flex-end" gap="12px">
        <CancelButton onClick={onClickCancelButton}>취소</CancelButton>
        <SaveButton onClick={onClickRegisterButton}>등록</SaveButton>
      </Row>
    </Column>
  );
}

const EditorWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  background-color: black;
  border-radius: 4px;

  .toastui-editor-toolbar {
    height: 45px;
  }
`;

const SaveButton = styled.button`
  width: 128px;
  height: 52px;
  font-size: 20px;
  line-height: 24.2px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #ed7f30;
  color: black;
`;

const CancelButton = styled.button`
  width: 128px;
  height: 52px;
  font-size: 20px;
  line-height: 24.2px;
  font-weight: 600;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  color: white;
`;
