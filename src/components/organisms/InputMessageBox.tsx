import { FC, useState, ChangeEvent } from "react";
import { EmojiData, CustomEmoji } from "emoji-mart";
import { useRouter } from "next/router";

import EmojiPicker from "../molecules/EmojiPicker";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
import UploadButton from "../atoms/UploadButton";

import { client } from "../../lib/client";
import { postMessageRes } from "../../types/message";

import style from "../../styles/components/organisms/InputMessageBox.module.scss";

const InputMessageBox: FC = () => {
  // API待ち
  const [disabled, setDisabled] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [placeholder, setPlaceholder] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  const {channelID} = router.query

  const sendMessage = () => {
    client.post<postMessageRes>(`/channels/${channelID}/messages`)
      .then(res => {
        setMessage("")
      })
      .catch(error => {

      })
  };

  const sendFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.table(e);
  };

  const selectEmoji = (e: EmojiData) => {
    console.table(e);
  };

  const onchange_event = (value: string) => {
    setMessage(value);

    // 改行のみ
    const result = `${value}\n`.match(/\n/g);
    if (result == null) return;
    setRows(result.length);

    // 折り返しに対応
    if (process.browser) {
      const target = document.getElementById("input_your_message");
      if (target == null) return;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight - 20}px`;
    };
  };

  //test Data
  const customEmojiData: CustomEmoji[] = [];

  const [uploadOnchange, setUploadOnchange] = useState<File>();

  return (
    <div className={style.outer}>
      <div className={style.messageBox}>
        <UploadButton onChange={sendFile} />
        <TextareaBox
          disabled={disabled}
          rows={rows}
          onChange={onchange_event}
          placeholder={placeholder}
          value={message}
          onKeyDown={sendMessage}
        />
        <SendButton onClick={sendMessage} />
        <EmojiPicker
          onSelect={selectEmoji}
          color={"#FFC266"}
          custom={customEmojiData}
        />
      </div>
    </div>
  );
};

export default InputMessageBox;
