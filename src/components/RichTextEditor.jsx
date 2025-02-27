import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Box, ToggleButton, ToggleButtonGroup, Paper, Typography } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const RichTextEditor = () => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const editorAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
      setIsPlaceholderVisible(savedContent === "<p style='color: #aaa;'>Start typing...</p>");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editorContent", content);
  }, [content]);

  const handleFormat = (command) => {
    document.execCommand(command, false);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerHTML;
      setContent(text);
      setIsPlaceholderVisible(text === "<p style='color: #aaa;'>Start typing...</p>");
    }
  };

  const handleFocus = () => {
    if (isPlaceholderVisible) {
      setContent("<p style='color: #aaa;'>Start typing...</p>");
      setIsPlaceholderVisible(true);
    }
  };

  const handleKeyDown = (e) => {
    if (isPlaceholderVisible && (e.key.length === 1 || e.key === "Backspace" || e.key === "Delete")) {
      setContent("");
      setIsPlaceholderVisible(false);
    }
    
  };

  useEffect(() => {
    if (editorRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [content, isPlaceholderVisible]);

  return (
    <Box position="relative" height={350} border={1} borderRadius={2} overflow="hidden" p={2}>
      <Box sx={{ mb: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Text Editor
        </Typography>

        <ToggleButtonGroup size="small" aria-label="text formatting options">
          <ToggleButton value="bold" onClick={() => handleFormat("bold")} aria-label="Bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" onClick={() => handleFormat("italic")} aria-label="Italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underline" onClick={() => handleFormat("underline")} aria-label="Underline">
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton value="bullet" onClick={() => handleFormat("insertUnorderedList")} aria-label="Bulleted List">
            <FormatListBulletedIcon />
          </ToggleButton>
          <ToggleButton value="number" onClick={() => handleFormat("insertOrderedList")} aria-label="Numbered List">
            <FormatListNumberedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <animated.div style={editorAnimation}>
        <Paper
          elevation={2}
          sx={{
            height: 250,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            cursor: "text",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            lineHeight: "1.5",
            "&[contenteditable]": {
              outline: "none",
            },
            "&:focus-visible": {
              borderColor: "primary.main",
            },
          }}
          contentEditable
          ref={editorRef}
          dangerouslySetInnerHTML={{ __html: isPlaceholderVisible ? "<p style='color: #aaa;'>Start typing...</p>" : content }}
          onInput={updateContent}
          onFocus={handleFocus}
          onBlur={() => {
            if (!content  || content === "<br>") {
              setIsPlaceholderVisible(true);
              editorRef.current.innerHTML ={isPlaceholderVisible} ? "<p style='color: #aaa;'>Start typing...</p>" : content;
            }
          }}
          onKeyDown={handleKeyDown}
          role="textbox"
          aria-multiline="true"
          suppressContentEditableWarning={true}
        />
      </animated.div>
    </Box>
  );
};

export default RichTextEditor;
