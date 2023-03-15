import classNames from "classnames";

function Panel ({ children, className, ...rest }) {
    const finalClassNames = classNames(
        'bg-panel-bg-color',
        'border-panel-border-color',
        'border-1',
        'rounded',
        'mb-2',
        'mt-2',
        'p-4',
        className
    )

    return <div {...rest} className={finalClassNames}>
        {children}
    </div>
};

export default Panel;