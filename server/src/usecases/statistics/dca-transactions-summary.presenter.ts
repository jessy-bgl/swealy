import { ApiProperty } from '@nestjs/swagger';

class DcaTransactionsSummaryPresenter {
  @ApiProperty()
  totalSize: number;
  @ApiProperty()
  avgPrice: number;
  @ApiProperty()
  totalInvested: number;
  @ApiProperty()
  currentValue: number;
  @ApiProperty()
  pnl: number;
  @ApiProperty()
  pnlPercentage: number;
}

export { DcaTransactionsSummaryPresenter };
