import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { useOptions } from "@/comn/hooks";
import { TFormControlOptions } from "@/comn/components";
import classNames from "classnames";

/**
 * edit=true
 *
 * name
 * value
 * onClick
 * onChange
 * onBlur
 * onFocus
 * readOnly
 * disabled
 */

/** */
type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    edit?: boolean;
    options?: TFormControlOptions;
    comnCd?: string;
    area?: string;
    lang?: string;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            edit = true,
            /** */
            comnCd,
            area,
            lang,
            options,
            /** */
            name,
            value,
            onClick,
            onChange,
            onBlur,
            onFocus,
            readOnly,
            disabled,
        } = props;

        const _props = Object.fromEntries(
            Object.entries({
                /** */
                name,
                value,
                onClick,
                onChange,
                onBlur,
                onFocus,
                readOnly,
                disabled,
            }).filter(([, value]) => value !== undefined),
        );

        const { t } = useTranslation();
        const o = useOptions({ comnCd, area, lang, options });

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);

        const _ref = React.useRef<(HTMLInputElement | null)[]>([]);
        const _refCb = React.useCallback<React.RefCallback<HTMLInputElement>>((node) => {
            _ref.current.push(node);
            if (!ref) return;
            if (typeof ref === "function") {
                ref(node);
            } else {
                ref.current = node;
            }
        }, []);

        return (
            <div className="w-full">
                {!edit && (
                    <div>
                        {
                            o.options?.find(({ value }) => {
                                return (
                                    value ===
                                    _ref.current.find((node) => {
                                        return node?.checked;
                                    })?.value
                                );
                            })?.label
                        }
                    </div>
                )}
                <div className={classNames("flex flex-wrap w-fit", !edit && "hidden")}>
                    {o.options?.map(({ label, value }, i) => {
                        return (
                            <label key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                <input {..._props} ref={_refCb} type="radio" value={value} />
                                {label && <div> {t(label)}</div>}
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    },
);
