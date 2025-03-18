import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { black } from "../../constants/color";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "transparent",
        border: "1px solid rgb(172, 28, 204)",
        color: "black",
        borderRadius: "8px",
        padding: "0.4rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={black} variant="body2">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {/* ATTACHMENT's */}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"textSecondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
