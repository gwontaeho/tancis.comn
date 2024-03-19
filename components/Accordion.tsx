import {
    useState,
    useCallback,
    useContext,
    createContext,
    useId,
    Children,
    cloneElement,
    useRef,
    useEffect,
} from "react";
import type { ReactNode } from "react";
import classNames from "classnames";
import { IconButton } from "./IconButton";
import { WIDTH } from "../features/foundation";

const Context = createContext<any>(null);

type AccordionProps = {
    children?: ReactNode;
    root?: boolean;
    size?: keyof typeof WIDTH;
};

const Details = ({ children, id }: any) => {
    const { init, open } = useContext(Context);

    const ref = (node: any) => {
        if (!init.current) return;
        if (node) {
            const { height } = node.getBoundingClientRect();
            const parent = node.parentElement;
            const summary = node.previousSibling;
            if (open === id) {
                parent.style.height = `${summary.getBoundingClientRect().height + height}px`;
                setTimeout(() => {
                    parent.style.height = "auto";
                }, 150);
            } else {
                parent.style.height = `${parent.getBoundingClientRect().height}px`;
                parent.style.height = `${summary.getBoundingClientRect().height}px`;
            }
        }
    };

    return (
        <div ref={ref} className="p-2">
            {children}
        </div>
    );
};

const Summary = ({ children, id }: any) => {
    const { setOpen } = useContext(Context);

    const lock = useRef(false);

    const ref = useCallback((node: any) => {
        if (node) {
            const { height } = node.getBoundingClientRect();
            node.parentElement.style.height = `${height}px`;
        }
    }, []);

    const handleToggle = () => {
        if (lock.current) return;
        lock.current = true;
        setOpen((prev: any) => {
            if (prev === id) return null;
            if (prev !== id) return id;
        });
        setTimeout(() => {
            lock.current = false;
        }, 150);
    };

    return (
        <div ref={ref} className="p-2 flex items-center justify-between">
            <div className="flex-1">{children}</div>
            <IconButton icon="down" size="xs" onClick={handleToggle} />
        </div>
    );
};

const Item = (props: AccordionProps) => {
    const { children } = props;

    const id = useId();

    return (
        <div className={classNames("overflow-hidden transition-[height]")}>
            {Children.map(children, (child: any) => {
                return cloneElement(child, { id });
            })}
        </div>
    );
};

const Root = (props: AccordionProps) => {
    const { children, size = "full" } = props;

    const init = useRef(false);
    const [open, setOpen] = useState(null);

    useEffect(() => {
        init.current = true;
    }, []);

    return (
        <Context.Provider value={{ init, open, setOpen }}>
            <div className={classNames("border rounded divide-y h-fit", size && WIDTH[size])}>{children}</div>
        </Context.Provider>
    );
};

const Accordion = (props: AccordionProps) => {
    const { root } = props;

    return root ? <Root {...props} /> : <Item {...props} />;
};

Accordion.Summary = Summary;
Accordion.Details = Details;

export { Accordion };
