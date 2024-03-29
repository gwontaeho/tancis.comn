import React, { useEffect, useRef } from "react";

type TTabSchema = any[];
type TTabDefaultSchema = {
    id?: string;
    schema: TTabSchema;
};
type UseTabProps = {
    defaultSchema: TTabDefaultSchema;
};

export const useTab = (props: UseTabProps) => {
    const { defaultSchema } = props;
    const { id, schema } = defaultSchema;
    const _active = useRef(0);

    const [_schema, _setSchema] = React.useState<TTabSchema>(() =>
        schema.map((_, i) => {
            const defaultActive = schema.some((_) => _.active) ? schema.findIndex((_) => _.active) : 0;
            return { ..._, active: i === defaultActive };
        }),
    );

    const value = _schema.findIndex((_) => _.active);

    const setActive = (index: number) => {
        _setSchema((prev) =>
            prev.map((_, i) => {
                _active.current = index;
                return { ..._, active: i === index };
            }),
        );
    };

    const getActive = () => {
        return _active.current;
    };
    const setDisabled = (index: number, status: boolean) => {
        _setSchema((prev) => {
            return prev.map((_, i) => {
                if (i !== index) return _;
                return { ..._, disabled: status, active: false };
            });
        });
    };

    const setVisible = (index: number, status: boolean) => {
        _setSchema((prev) =>
            prev.map((_, i) => {
                if (i !== index) return _;
                return { ..._, visible: status };
            }),
        );
    };

    const setLabel = (index: number, label: string) => {
        _setSchema((prev) =>
            prev.map((_, i) => {
                if (i !== index) return _;
                return { ..._, label };
            }),
        );
    };

    const tab = { value, schema: _schema, onChange: setActive };

    return { tab, value, setActive, setDisabled, setVisible, setLabel, getActive, setSchema: _setSchema };
};
