import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import lodash from "lodash";
import { Icon } from "@/comn/components";

type PaginationProps = {
    page?: number;
    size?: number;
    totalCount?: number;
    totalCountView?: number;
    pageGroupSize?: number;
    onChangePage?: (page: number) => void;
    onChangeSize?: (page: number) => void;
};

export const Pagination = (props: PaginationProps) => {
    const {
        page = 0,
        size = 10,
        totalCount = 0,
        totalCountView,
        pageGroupSize = 10,
        onChangePage,
        onChangeSize,
    } = props;

    const [_pageGroup, _setPageGroup] = useState(0);
    const _pageGroups = lodash.chunk(Array.from(Array(Math.ceil(totalCount / size)).keys()), pageGroupSize);

    useEffect(() => {
        _setPageGroup(0);
    }, [size]);

    useEffect(() => {
        _setPageGroup(Math.floor(page / pageGroupSize));
    }, [page]);

    const handleChangePage = (nextPage: number) => {
        if (onChangePage) onChangePage(nextPage);
    };

    const handleChangeSize = (nextSize: number) => {
        handleChangePage(0);
        if (onChangeSize) onChangeSize(nextSize);
    };

    return (
        <div className="flex justify-between">
            <div className="flex items-center space-x-2">
                <p>
                    Page : {page + 1} / {Math.ceil(totalCount / size)}
                </p>
                <select className="input w-14" value={size} onChange={(e) => handleChangeSize(Number(e.target.value))}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                </select>
                <p>Total : {totalCountView ?? totalCount}</p>
            </div>
            <ul className="flex space-x-1">
                <button
                    disabled={_pageGroup < 1}
                    className="button w-7 flex items-center justify-center disabled:text-disabled"
                    onClick={() => _setPageGroup((prev) => prev - 1)}
                >
                    <Icon icon="left" size="xs" />
                </button>
                {_pageGroups[_pageGroup]?.map((_) => {
                    return (
                        <li key={uuid()}>
                            <button
                                {...(page === _ && { "aria-current": "page" })}
                                className="button min-w-[1.75rem] aria-[current=page]:text-uf-blue"
                                onClick={() => handleChangePage(_)}
                            >
                                {_ + 1}
                            </button>
                        </li>
                    );
                })}
                <button
                    className="button w-7 flex items-center justify-center disabled:text-disabled"
                    disabled={_pageGroup >= _pageGroups.length - 1}
                    onClick={() => _setPageGroup((prev) => prev + 1)}
                >
                    <Icon icon="right" size="xs" />
                </button>
            </ul>
        </div>
    );
};
