import json
import setuptools

kwargs = json.loads(
    """
{
    "name": "mycorp.package",
    "version": "0.1.0",
    "description": "cdk_jsii",
    "license": "MIT",
    "url": "https://github.com/OWNER/REPO.git",
    "long_description_content_type": "text/markdown",
    "author": "NAME<EMAIL>",
    "bdist_wheel": {
        "universal": true
    },
    "project_urls": {
        "Source": "https://github.com/OWNER/REPO.git"
    },
    "package_dir": {
        "": "src"
    },
    "packages": [
        "mycorp.package",
        "mycorp.package._jsii"
    ],
    "package_data": {
        "mycorp.package._jsii": [
            "cdk_jsii@0.1.0.jsii.tgz"
        ],
        "mycorp.package": [
            "py.typed"
        ]
    },
    "python_requires": "~=3.7",
    "install_requires": [
        "aws-cdk-lib==2.47.0",
        "constructs>=10.0.0, <11.0.0",
        "jsii>=1.70.0, <2.0.0",
        "publication>=0.0.3",
        "typeguard~=2.13.3"
    ],
    "classifiers": [
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Typing :: Typed",
        "License :: OSI Approved"
    ],
    "scripts": []
}
"""
)

with open("README.md", encoding="utf8") as fp:
    kwargs["long_description"] = fp.read()


setuptools.setup(**kwargs)
