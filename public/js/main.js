function showLink(local, remote) {
    const div = document.createElement('div');
    div.className = 'alert alert-warning alert-dismissible fade show';
    div.setAttribute('role', 'alert');

    const localLink = document.createElement('a');
    localLink.className = 'alert-link';
    localLink.href = local;
    localLink.appendChild(document.createTextNode(local));

    const remoteLink = document.createElement('a');
    remoteLink.className = 'alert-link';
    remoteLink.href = remote.text(); // html escape precaution
    remoteLink.appendChild(document.createTextNode(remote));

    const span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');

    const dismiss = document.createElement('button')
    dismiss.className = 'close';
    dismiss.setAttribute('type', 'button');
    dismiss.setAttribute('data-dismiss', 'alert');
    dismiss.setAttribute('aria-label', 'Close');
    dismiss.appendChild(span).appendChild(document.createTextNode('×'));

    div.appendChild(remoteLink);
    div.appendChild(document.createTextNode(' shortened to '));
    div.appendChild(localLink);
    div.appendChild(dismiss);

    document.body.appendChild(div);
}

function convert() {
    const url = encodeURIComponent(document.getElementById('url').value);
    fetch('http://' + (document.domain || 'localhost') + ':3000/crumb?url=' + url, {
        method: 'POST',
    }).then((res) => {
        if (res.ok) {
            res.json().then((data) => showLink(data.local, data.remote));
        } else {
            console.error('yikes nothing to see here');
            console.log(res);
        }
    });
}