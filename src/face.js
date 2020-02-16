module.exports = (eyestatus=true) => {
    const face = 
    [
        '         ▬▬▬        ',
        '      ▬       ▬     ',
        `    ▬   ${eyestatus ? '▬' : '-'}    ${eyestatus ? '▬' : '-'}  ▬   `,
        '    ▬      |     ▬  ',
        '    ▬      ־־     ▬ ',
        `    ▬     ▬▬▬   ▬   `,
        '    ▬        ▬      ',
        '    ▬        ▬      ',
        '    ▬--------▬      ',
        '   ▬-----------▬    ',
        ' ▬  ▬▬▬▬▬▬▬▬▬▬▬  ▬  ',
        ' ▬  ▬         ▬  ▬  ',
        '    ▬▬        ▬▬    ',
        '   Made by Anton    ',
    ];
    return face;
};

