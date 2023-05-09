import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useField, useFormikContext } from 'formik';
import Image from 'next/image';
import { Box } from '@mui/material';
import DrapImg from '@/public/drag.png';

interface FileInputProps {
  name: string;
  type: string;
  ariaLabel?: string;
  isVideo?: boolean;
}

const DragAndDropInput: React.FC<FileInputProps> = ({
  ariaLabel,
  name,
  type,
  isVideo,
}) => {
  const [{ value }, { error }] = useField<FileList>(name);
  const { setFieldValue } = useFormikContext();
  const [previewImg, setPreviewImg] = useState<any>(null);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.dataTransfer.files.length) {
        setFieldValue(name, event?.dataTransfer?.files[0]);
      }
    },
    [setFieldValue, name],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        setFieldValue(name, event?.target?.files[0]);
        setPreviewImg(
          (event.target?.files &&
            URL.createObjectURL(event.target?.files[0])) ||
            null,
        );
      }
    },
    [setFieldValue, name],
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  return (
    <InputStyle onDrop={handleDrop} onDragOver={handleDragOver}>
      <input
        type={type}
        name={name}
        aria-label={ariaLabel}
        className="input-file-upload"
        onChange={handleInputChange}
      />
      {error ? <div style={{ color: `red` }}>{error}</div> : null}

      <button className="file-btn">
        {value ? (
          <div>
            {isVideo ? (
              <video width="250">
                <source src={previewImg} type="video/webm" />
                <source src={previewImg} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={previewImg}
                alt="profileImg"
                height={50}
                width={60}
                className="previewImg"
              />
            )}
          </div>
        ) : (
          <div>
            <Box>
              <Image src={DrapImg} alt="profileImg" height={50} width={60} />
            </Box>
            <p>Drag and drop your file here or</p>
            <p>
              Click to <span>choose file</span>
            </p>
          </div>
        )}
      </button>
    </InputStyle>
  );
};

const InputStyle = styled(`div`)(({ theme }) => ({
  height: `10rem`,
  maxWidth: `100%`,
  textAlign: `center`,
  position: `relative`,
  marginTop: `0.7rem`,
  overflow: `hidden`,

  p: {
    fontSize: `0.8rem`,
    color: theme.palette.primary.main,

    span: {
      fontWeight: `700`,
      color: theme.palette.secondary.main,
    },
  },

  '.input-file-upload': {
    position: `absolute`,
    fontSize: `100px`,
    opacity: `0`,
    right: `0`,
    top: `0`,
  },

  '.file-btn': {
    height: `100%`,
    width: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    borderWidth: `2px`,
    borderStyle: `dashed`,
    borderColor: `#cbd5e1`,
    backgroundColor: `#f8fafc`,
    overflow: `hidden`,
    padding: `1rem`,

    '.previewImg': {
      objectFit: `cover`,
      width: `100%`,
      height: `10rem`,
    },
  },
}));

export default DragAndDropInput;
