import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { SettingsForm, SettingsFormValues } from "../components/SettingsForm";
import { useSnackbar } from "notistack";

const Settings: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      // await updateSettings(data);   // 本来はここにDB更新処理など入れる
      console.log(data);
      enqueueSnackbar("設定を保存しました", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("エラーが発生しました", { variant: "error" });
      throw err;
    }
  };

  return (
    <Box sx={{ p: 36 }}>
      <Paper sx={{ p: 4, backgroundColor: "rgba(0,0,0,0.01)" }}>
        <Typography sx={{ my: 2 }}>店舗情報設定</Typography>
        <SettingsForm onSubmit={onSubmit} />
      </Paper>
    </Box>
  );
};

export default Settings;
