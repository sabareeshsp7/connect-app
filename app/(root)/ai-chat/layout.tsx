type Props = React.PropsWithChildren<{}>;

export default function AIChatLayout({ children }: Props) {
  return (
    <div className="h-full w-full flex">
      {children}
    </div>
  );
}
