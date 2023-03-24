import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type OnSubmitSettingsForm = SubmitHandler<SettingsFormValues>;

const SettingsFormSchema = z.object({
  address: z.string().min(1, "住所を入力してください"),
  name: z.string().min(1, "名前を入力してください"),
});

export type SettingsFormValues = z.infer<typeof SettingsFormSchema>;
const resolver = zodResolver(SettingsFormSchema);

export type SettingsFormProps = {
  onSubmit: OnSubmitSettingsForm;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit }) => {
  const {
    // register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    defaultValues: { address: "", name: "" },
    resolver,
  });

  // SettingsForm内でラップする
  const _onSubmit = async (data: unknown) => {
    try {
      if (isSettingFormValues(data)) {
        onSubmit(data);
        reset(data);
      } else {
        throw new Error("Invalid input");
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="address"
              fullWidth
              label="住所"
              variant="outlined"
              error={errors.address != null}
              helperText={errors.address?.message || ""}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="name"
              fullWidth
              label="名前"
              variant="outlined"
              error={errors.name != null}
              helperText={errors.name?.message || ""}
            />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            reset();
          }}
        >
          最後に保存した状態に戻る
        </Button>
        <Button type="submit" variant="contained">
          保存
        </Button>
      </Box>
    </form>
  );
};

/**
 * SettingFormValues型であるかどうか
 * @param value
 * @returns SettingFormValues型であるかどうか
 */
function isSettingFormValues(value: unknown): value is SettingsFormValues {
  const formValues = value as Record<keyof SettingsFormValues, unknown>;
  return (
    typeof value === "object" &&
    value != null &&
    typeof formValues.address === "string" &&
    typeof formValues.name === "string"
  );
}
