import { Dialog, DialogContent, DialogContentText } from "@mui/material";

type Props = {
  data: string;
  onClose: () => void;
};

const TransactionInfoDialog = ({ onClose, data }: Props) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{data}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export { TransactionInfoDialog };
