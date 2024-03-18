import dayjs from "dayjs";
import classNames from "classnames";

type TChat = {
    data?: any[];
};

type TMessage = {
    name?: string;
    date?: Date;
    content?: any;
    position?: "left" | "right";
};

const Message = (props: TMessage) => {
    const { name, date, content, position } = props;

    return (
        <div className={classNames("flex flex-col gap-2 w-1/2", position === "right" && "self-end")}>
            <div className={classNames("px-2 flex gap-2", position === "right" && "self-end")}>
                <div className="font-semibold text-uf-blue">{name}</div>
                <div className="text-uf-darkgray">[{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}]</div>
            </div>
            <div
                className={classNames(
                    "border p-2 rounded text-sm",
                    position === "right" ? "bg-uf-blue/5" : "bg-uf-error/5",
                )}
            >
                {content}
            </div>
        </div>
    );
};

const Chat = ({ data }: TChat) => {
    return (
        <div className="flex flex-col gap-4">
            {data?.map((message: any) => {
                return <Message {...message} />;
            })}
        </div>
    );
};

export { Chat };
