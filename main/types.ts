export interface Tool {
  name: string
  run: (input: any) => Promise<any>
}